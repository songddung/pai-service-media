import { OwnerType } from 'pai-shared-types';

export class UploadMediaCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly ownerType: OwnerType,
    public readonly ownerId: bigint,
    public readonly profileId: bigint,
  ) {}
}
