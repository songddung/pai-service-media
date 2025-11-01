export class StorageInfo {
  private constructor(
    private readonly s3Key: string,
    private readonly cdnUrl: string,
  ) {
    Object.freeze(this);
  }

  static create(s3Key: string, cdnUrl: string): StorageInfo {
    if (!s3Key || s3Key.trim() === '') {
      throw new Error('S3 키는 필수입니다.');
    }

    if (!cdnUrl || cdnUrl.trim() === '') {
      throw new Error('CDN URL은 필수입니다.');
    }

    return new StorageInfo(s3Key, cdnUrl);
  }

  getS3Key(): string {
    return this.s3Key;
  }

  getCdnUrl(): string {
    return this.cdnUrl;
  }

  equals(other: StorageInfo): boolean {
    return this.s3Key === other.s3Key && this.cdnUrl === other.cdnUrl;
  }
}
