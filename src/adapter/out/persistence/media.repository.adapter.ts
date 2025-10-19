import { Injectable } from '@nestjs/common';
import { MediaRepositoryPort } from 'src/application/port/out/media.repository.port';
import { PrismaService } from './prisma/prisma.service';
import { Media } from 'src/domain/model/media.entity';
import { OwnerType } from 'pai-shared-types';

@Injectable()
export class MediaRepositoryAdapter implements MediaRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(media: Media): Promise<Media> {
    const record = await this.prisma.media.create({
      data: {
        file_name: media.getFileName(),
        mime_type: media.getMimeType(),
        file_size: media.getFileSize(),
        s3_key: media.getS3Key(),
        cdn_url: media.getCdnUrl(),
        owner_type: media.getOwnerType(),
        owner_id: media.getOwnerId(),
        profile_id: media.getProfileId(),
      },
    });

    return Media.rehydrate({
      id: record.media_id,
      fileName: record.file_name,
      mimeType: record.mime_type,
      fileSize: record.file_size,
      s3Key: record.s3_key,
      cdnUrl: record.cdn_url,
      ownerType: record.owner_type as OwnerType,
      ownerId: record.owner_id,
      profileId: record.profile_id,
      createdAt: record.created_at,
    });
  }

  async delete(mediaId: number): Promise<void> {
    if (!mediaId) {
      throw new Error('Media ID is required for delete');
    }

    await this.prisma.media.delete({
      where: { media_id: BigInt(mediaId) },
    });
  }
}
