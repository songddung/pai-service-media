import type { UploadMediaResponseData } from 'pai-shared-types';

export class UploadMediaResponseDto implements UploadMediaResponseData {
  mediaId: string;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  fileSize: string;
  createdAt: string;
}
