import { Media } from 'src/domain/model/entity/media.entity';

/**
 * Media Query Port (읽기 전용)
 * - 조회 작업만 담당
 */
export interface MediaQueryPort {
  findByIds(mediaIds: bigint[]): Promise<Media[]>;
}
