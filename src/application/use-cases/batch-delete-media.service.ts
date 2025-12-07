import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BatchDeleteMediaUseCase } from "../port/in/batch-delete-media.use-case";
import { MEDIA_TOKENS } from "src/media.token";
import type { MediaRepositoryPort } from "../port/out/media.repository.port";
import type { MediaQueryPort } from "../port/out/media.query.port";
import type { S3ServicePort } from "../port/out/s3-service.port";
import { BatchDeleteMediaCommand } from "../command/batch-delete-media.command";

@Injectable()
export class BatchDeleteMediaService implements BatchDeleteMediaUseCase {
    constructor(
        @Inject(MEDIA_TOKENS.mediaRepositoryPort)
        private readonly mediaRepository: MediaRepositoryPort,

        @Inject(MEDIA_TOKENS.mediaQueryPort)
        private readonly mediaQuery: MediaQueryPort,

        @Inject(MEDIA_TOKENS.s3ServicePort)
        private readonly s3Service: S3ServicePort,
    ){}

    async execute(command: BatchDeleteMediaCommand): Promise<void> {
        if (!command.mediaIds || command.mediaIds.length === 0) {
            return;
        }

        const mediaList = await this.mediaQuery.findByIds(command.mediaIds);

        if(!mediaList || mediaList.length===0) {
            throw new NotFoundException('삭제할 미디어를 찾을 수 없습니다.');
        }

        // S3에서 파일 일괄 삭제 (병렬 처리)
        const s3DeletePromises = mediaList.map((media) =>
            this.s3Service.delete(media.getS3Key()).catch((error) => {
                console.error(`S3 파일 삭제 실패 (${media.getS3Key()}):`, error);
            })
        );

        await Promise.all(s3DeletePromises);

        // DB에서 일괄 삭제
        const deleteDbPromises = command.mediaIds.map((id) =>
            this.mediaRepository.delete(Number(id))
        );

        await Promise.all(deleteDbPromises);
    }
}