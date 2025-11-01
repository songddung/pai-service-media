import { Inject, Injectable } from '@nestjs/common';
import { GetMediaUseCase } from '../port/in/get-media.use-case';
import { GetMediaCommand } from '../command/get-media.command';
import { MEDIA_TOKENS } from 'src/media.token';

import { GetMediaResult } from '../port/in/result/get-media.result';
import type { MediaQueryPort } from '../port/out/media.query.port';

@Injectable()
export class GetMediaService implements GetMediaUseCase {
  constructor(
    @Inject(MEDIA_TOKENS.MediaQueryPort)
    private readonly mediaQuery: MediaQueryPort,
  ) {}

  async execute(command: GetMediaCommand): Promise<GetMediaResult[]> {
    // 1. Repository에서 미디어 조회
    const mediaList = await this.mediaQuery.findByOwners(
      command.ownerType,
      command.ownerIds,
    );

    // 2. Response DTO 변환
    return mediaList.map((media) => ({
      mediaId: media.getId()!,
      ownerType: media.getOwnerType(),
      ownerId: media.getOwnerId(),
      cdnUrl: media.getCdnUrl(),
      fileName: media.getFileName(),
      mimeType: media.getMimeType(),
      s3Key: media.getS3Key(),
      createdAt: media.getCreatedAt().toISOString(),
    }));
  }
}
