import { Injectable } from '@nestjs/common';
import { MediaRepositoryPort } from 'src/application/port/out/media.repository.port';
import { PrismaService } from '../prisma/prisma.service';
import { Media } from 'src/domain/model/entity/media.entity';
import { MediaMapper } from './media.mapper';

@Injectable()
export class MediaRepositoryAdapter implements MediaRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(media: Media): Promise<Media> {
    const record = await this.prisma.media.create({
      data: MediaMapper.toPersistence(media),
    });

    return MediaMapper.toDomain(record);
  }

  async delete(mediaId: number): Promise<void> {
    if (!mediaId) {
      throw new Error('Media ID is required for delete');
    }

    await this.prisma.media.delete({
      where: { media_id: BigInt(mediaId) },
    });
  }

  async deleteMany(mediaIds: number[]): Promise<void> {
    if(!mediaIds || mediaIds.length == 0) {
      throw new Error('Media IDs are required for batch delete');
    }

    await this.prisma.media.deleteMany({
      where: {
        media_id: {
          in: mediaIds.map(id=>BigInt(id))
        }
      },
    });
  }
}
