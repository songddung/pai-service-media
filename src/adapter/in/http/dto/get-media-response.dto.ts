import type { GetMediaResponseData } from 'pai-shared-types';

export class GetMediaResponseDto implements GetMediaResponseData {
  mediaId: string;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  s3Key: string;
  createdAt: string;
}
