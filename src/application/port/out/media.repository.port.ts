import { Media } from 'src/domain/model/media.entity';

export interface MediaRepositoryPort {
  save(media: Media): Promise<Media>;
  delete(mediaId: number): Promise<void>;
}
