import { Inject, Injectable } from '@nestjs/common';
import { GetMediaUseCase } from '../port/in/get-media.use-case';
import { GetMediaCommand } from '../command/get-media.command';
import { MEDIA_TOKENS } from 'src/media.token';
import type { MediaRepositoryPort } from '../port/out/media.repository.port';
import { GetMediaResult } from '../port/in/result/get-media.result';

@Injectable()
export class GetMediaService implements GetMediaUseCase {
  constructor(
    @Inject(MEDIA_TOKENS.mediaRepositoryPort)
    private readonly mediaRepository: MediaRepositoryPort,
  ) {}

  async execute(command: GetMediaCommand): Promise<GetMediaResult[]> {
    // 1. Repository에서 미디어 조회
    const mediaList = await this.mediaRepository.findByOwners(
      command.ownerType,
      command.ownerIds,
    );

    // 2. Response DTO 변환
    return mediaList.map((media) => ({
      mediaId: Number(media.getId())!,
      ownerType: media.getOwnerType(),
      ownerId: Number(media.getOwnerId()),
      cdnUrl: media.getCdnUrl(),
      fileName: media.getFileName(),
      mimeType: media.getMimeType(),
      s3Key: media.getS3Key(),
      createdAt: media.getCreatedAt().toISOString(),
    }));
  }
}
