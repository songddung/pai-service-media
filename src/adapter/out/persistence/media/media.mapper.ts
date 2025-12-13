import { Media } from 'src/domain/model/entity/media.entity';
import { FileInfo } from 'src/domain/model/vo/file-info.vo';
import { StorageInfo } from 'src/domain/model/vo/storage-info.vo';
import { MediaRecord } from './media.type';

export class MediaMapper {
  /**
   * Prisma Record → Domain Entity
   * DB에서 조회한 데이터를 도메인 엔티티로 변환
   */
  static toDomain(record: MediaRecord): Media {
    const fileInfo = FileInfo.create(
      record.file_name,
      record.mime_type,
      record.file_size,
    );

    const storageInfo = StorageInfo.create(record.s3_key, record.cdn_url);

    return Media.rehydrate({
      id: record.media_id,
      fileInfo,
      storageInfo,
      createdAt: record.created_at,
    });
  }

  /**
   * Domain Entity → Prisma Data
   * 도메인 엔티티를 Prisma의 create/update용 데이터로 변환
   */
  static toPersistence(media: Media): {
    file_name: string;
    mime_type: string;
    file_size: bigint;
    s3_key: string;
    cdn_url: string;
  } {
    return {
      file_name: media.getFileName(),
      mime_type: media.getMimeType(),
      file_size: media.getFileSize(),
      s3_key: media.getS3Key(),
      cdn_url: media.getCdnUrl(),
    };
  }
}
