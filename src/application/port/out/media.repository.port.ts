import { Media } from 'src/domain/model/media.entity';
import type { OwnerType } from 'pai-shared-types';

export interface MediaRepositoryPort {
  save(media: Media): Promise<Media>;
  delete(mediaId: number): Promise<void>;
  findByOwners(ownerType: OwnerType, ownerIds: bigint[]): Promise<Media[]>;
}
