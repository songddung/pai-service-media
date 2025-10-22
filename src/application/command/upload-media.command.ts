import { ownerType } from '../port/in/enum/owner-type';

export class UploadMediaCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly ownerType: ownerType,
    public readonly ownerId: number,
    public readonly profileId: number,
  ) {}
}
