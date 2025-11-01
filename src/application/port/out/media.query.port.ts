import { Media } from 'src/domain/model/entity/media.entity';
import type { OwnerType } from 'pai-shared-types';

/**
 * Media Query Port (읽기 전용)
 * - 조회 작업만 담당
 */
export interface MediaQueryPort {
  findByOwners(ownerType: OwnerType, ownerIds: bigint[]): Promise<Media[]>;
}
