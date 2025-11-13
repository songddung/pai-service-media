import { FileInfo } from '../vo/file-info.vo';
import { StorageInfo } from '../vo/storage-info.vo';

interface CreateMediaProps {
  fileInfo: FileInfo;
  storageInfo: StorageInfo;
}

interface RehydrateMediaProps extends CreateMediaProps {
  id: bigint;
  createdAt: Date;
}

export class Media {
  private constructor(
    private readonly id: bigint | null,
    private readonly fileInfo: FileInfo,
    private readonly storageInfo: StorageInfo,
    private readonly createdAt: Date,
  ) {}

  static create(props: CreateMediaProps): Media {
    return new Media(
      null, // ID는 DB에서 생성
      props.fileInfo,
      props.storageInfo,
      new Date(),
    );
  }

  /**
   * DB에서 조회한 데이터로 엔티티 재구성
   */
  static rehydrate(props: RehydrateMediaProps): Media {
    return new Media(
      props.id,
      props.fileInfo,
      props.storageInfo,
      props.createdAt,
    );
  }

  // Getters
  getId(): bigint | null {
    return this.id;
  }

  getFileInfo(): FileInfo {
    return this.fileInfo;
  }

  getFileName(): string {
    return this.fileInfo.getFileName();
  }

  getMimeType(): string {
    return this.fileInfo.getMimeType();
  }

  getFileSize(): bigint {
    return this.fileInfo.getFileSize();
  }

  getStorageInfo(): StorageInfo {
    return this.storageInfo;
  }

  getS3Key(): string {
    return this.storageInfo.getS3Key();
  }

  getCdnUrl(): string {
    return this.storageInfo.getCdnUrl();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isImage(): boolean {
    return this.fileInfo.isImage();
  }

  isVideo(): boolean {
    return this.fileInfo.isVideo();
  }

  isAudio(): boolean {
    return this.fileInfo.isAudio();
  }
}
