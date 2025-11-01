import { ownerType } from 'src/application/port/in/enum/owner-type';
import { FileInfo } from '../vo/file-info.vo';
import { StorageInfo } from '../vo/storage-info.vo';

interface CreateMediaProps {
  fileInfo: FileInfo;
  storageInfo: StorageInfo;
  ownerType: ownerType;
  ownerId: bigint;
  profileId: bigint;
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
    private readonly ownerType: ownerType,
    private readonly ownerId: bigint,
    private readonly profileId: bigint,
    private readonly createdAt: Date,
  ) {}

  static create(props: CreateMediaProps): Media {
    return new Media(
      null, // ID는 DB에서 생성
      props.fileInfo,
      props.storageInfo,
      props.ownerType,
      props.ownerId,
      props.profileId,
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
      props.ownerType,
      props.ownerId,
      props.profileId,
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

  getOwnerType(): ownerType {
    return this.ownerType;
  }

  getOwnerId(): bigint {
    return this.ownerId;
  }

  getProfileId(): bigint {
    return this.profileId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // 도메인 로직
  isOwnedBy(profileId: bigint): boolean {
    return this.profileId === profileId;
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
