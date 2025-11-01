import { ownerType } from '../enum/owner-type';

export interface GetMediaResult {
  mediaId: bigint;
  ownerType: ownerType;
  ownerId: bigint;
  cdnUrl: string;
  fileName: string;
  mimeType: string;
  s3Key: string;
  createdAt: string;
}
