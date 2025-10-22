import { ownerType } from '../enum/owner-type';

export interface GetMediaResult {
  mediaId: number;
  ownerType: ownerType;
  ownerId: number;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  s3Key: string;
  createdAt: string;
}
