import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteMediaUseCase } from '../port/in/delete-media.use-case';
import { DeleteMediaCommand } from '../command/delete-media.command';
import { MEDIA_TOKENS } from 'src/media.token';
import type { MediaRepositoryPort } from '../port/out/media.repository.port';
import type { MediaQueryPort } from '../port/out/media.query.port';
import type { S3ServicePort } from '../port/out/s3-service.port';

@Injectable()
export class DeleteMediaService implements DeleteMediaUseCase {
  constructor(
    @Inject(MEDIA_TOKENS.mediaRepositoryPort)
    private readonly mediaRepository: MediaRepositoryPort,

    @Inject(MEDIA_TOKENS.mediaQueryPort)
    private readonly mediaQuery: MediaQueryPort,

    @Inject(MEDIA_TOKENS.s3ServicePort)
    private readonly s3Service: S3ServicePort,
  ) {}

  async execute(command: DeleteMediaCommand): Promise<void> {
    // 1. Media 존재 여부 확인
    const media = await this.mediaQuery.findById(command.mediaId);
    if (!media) {
      throw new NotFoundException(
        `미디어 ID ${command.mediaId}를 찾을 수 없습니다.`,
      );
    }

    // 2. S3에서 파일 삭제
    try {
      await this.s3Service.delete(media.getS3Key());
    } catch (error) {
      console.error('S3 파일 삭제 실패:', error);
      // S3 삭제 실패해도 DB에서는 삭제
    }

    // 3. DB에서 삭제
    await this.mediaRepository.delete(Number(command.mediaId));
  }
}
