import { OwnerType } from 'pai-shared-types';

interface CreateMediaProps {
  fileName: string;
  mimeType: string;
  fileSize: bigint;
  s3Key: string;
  cdnUrl: string;
  ownerType: OwnerType;
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
    private readonly fileName: string,
    private readonly mimeType: string,
    private readonly fileSize: bigint,
    private readonly s3Key: string,
    private readonly cdnUrl: string,
    private readonly ownerType: OwnerType,
    private readonly ownerId: bigint,
    private readonly profileId: bigint,
    private readonly createdAt: Date,
  ) {}

  /**
   * »\¥ ¯¥ ›1 (| ≈\‹ ‹)
   */
  static create(props: CreateMediaProps): Media {
    // Dà»§ ‹Y Äù
    if (!props.fileName || props.fileName.trim() === '') {
      throw new Error('|Ö@ DÖ»‰.');
    }

    if (!props.mimeType) {
      throw new Error('MIME ¿Ö@ DÖ»‰.');
    }

    if (props.fileSize <= 0n) {
      throw new Error('| l0î 0Ù‰ ‰| i»‰.');
    }

    return new Media(
      null, // IDî DB– ›1
      props.fileName,
      props.mimeType,
      props.fileSize,
      props.s3Key,
      props.cdnUrl,
      props.ownerType,
      props.ownerId,
      props.profileId,
      new Date(),
    );
  }

  /**
   * DB– àÏ, L ¨©
   */
  static rehydrate(props: RehydrateMediaProps): Media {
    return new Media(
      props.id,
      props.fileName,
      props.mimeType,
      props.fileSize,
      props.s3Key,
      props.cdnUrl,
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

  getFileName(): string {
    return this.fileName;
  }

  getMimeType(): string {
    return this.mimeType;
  }

  getFileSize(): bigint {
    return this.fileSize;
  }

  getS3Key(): string {
    return this.s3Key;
  }

  getCdnUrl(): string {
    return this.cdnUrl;
  }

  getOwnerType(): OwnerType {
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

  // Dà»§ T‹
  isOwnedBy(profileId: bigint): boolean {
    return this.profileId === profileId;
  }

  isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  isVideo(): boolean {
    return this.mimeType.startsWith('video/');
  }

  isAudio(): boolean {
    return this.mimeType.startsWith('audio/');
  }
}
