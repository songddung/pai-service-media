import { Injectable } from '@nestjs/common';
import { UploadMediaRequestDto } from 'pai-shared-types';
import { UploadMediaCommand } from 'src/application/command/upload-media.command';

@Injectable()
export class MediaMapper {
  toUploadMediaCommand(
    file: Express.Multer.File,
    dto: UploadMediaRequestDto,
    profileId: number,
  ): UploadMediaCommand {
    console.log('profileId:', profileId, typeof profileId);
    console.log('dto:', dto);

    const ownerId = dto.ownerId || (dto as any)['ownerId'];
    const ownerType = dto.ownerType || (dto as any)['ownerType'];

    return new UploadMediaCommand(file, ownerType, BigInt(ownerId), BigInt(profileId));
  }
}
