import { Media } from 'src/domain/model/entity/media.entity';

/**
 * Media Repository Port (쓰기 전용)
 * - 저장/삭제 작업만 담당
 */
export interface MediaRepositoryPort {
  save(media: Media): Promise<Media>;
  delete(mediaId: number): Promise<void>;
}
