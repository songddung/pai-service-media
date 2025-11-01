export class FileInfo {
  private constructor(
    private readonly fileName: string,
    private readonly mimeType: string,
    private readonly fileSize: bigint,
  ) {
    Object.freeze(this);
  }

  static create(
    fileName: string,
    mimeType: string,
    fileSize: bigint,
  ): FileInfo {
    if (!fileName || fileName.trim() === '') {
      throw new Error('파일명은 필수입니다.');
    }

    if (!mimeType || mimeType.trim() === '') {
      throw new Error('MIME 타입은 필수입니다.');
    }

    if (fileSize <= 0n) {
      throw new Error('파일 크기는 0보다 커야 합니다.');
    }

    return new FileInfo(fileName, mimeType, fileSize);
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

  isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  isVideo(): boolean {
    return this.mimeType.startsWith('video/');
  }

  isAudio(): boolean {
    return this.mimeType.startsWith('audio/');
  }

  equals(other: FileInfo): boolean {
    return (
      this.fileName === other.fileName &&
      this.mimeType === other.mimeType &&
      this.fileSize === other.fileSize
    );
  }
}
