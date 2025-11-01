export interface UploadMediaResult {
  mediaId: bigint;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  fileSize: bigint;
  createdAt: string;
}
