import { Injectable } from '@nestjs/common';
import { MediaQueryPort } from 'src/application/port/out/media.query.port';
import { PrismaService } from '../prisma/prisma.service';
import { Media } from 'src/domain/model/entity/media.entity';
import { MediaMapper } from './media.mapper';

@Injectable()
export class MediaQueryAdapter implements MediaQueryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByIds(mediaIds: bigint[]): Promise<Media[]> {
    // 빈 배열이면 전체 조회
    if (mediaIds.length === 0) {
      const records = await this.prisma.media.findMany({
        orderBy: {
          created_at: 'desc',
        },
      });
      return records.map((record) => MediaMapper.toDomain(record));
    }

    // ID로 필터링
    const records = await this.prisma.media.findMany({
      where: {
        media_id: {
          in: mediaIds,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return records.map((record) => MediaMapper.toDomain(record));
  }
}
