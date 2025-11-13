export interface GetMediaResult {
  mediaId: bigint;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  s3Key: string;
  createdAt: string;
}
