import { Injectable } from '@nestjs/common';
import { MediaQueryPort } from 'src/application/port/out/media.query.port';
import { PrismaService } from '../prisma/prisma.service';
import { Media } from 'src/domain/model/entity/media.entity';
import { OwnerType } from 'pai-shared-types';
import { MediaMapper } from './media.mapper';

@Injectable()
export class MediaQueryAdapter implements MediaQueryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByOwners(
    ownerType: OwnerType,
    ownerIds: bigint[],
  ): Promise<Media[]> {
    const records = await this.prisma.media.findMany({
      where: {
        owner_type: ownerType,
        owner_id: {
          in: ownerIds,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return records.map((record) => MediaMapper.toDomain(record));
  }
}
