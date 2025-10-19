import { Injectable } from '@nestjs/common';
import type { UploadMediaRequestDto, OwnerType } from 'pai-shared-types';
import { UploadMediaCommand } from 'src/application/command/upload-media.command';
import { GetMediaCommand } from 'src/application/command/get-media.command';

@Injectable()
export class MediaMapper {
  toUploadMediaCommand(
    file: Express.Multer.File,
    dto: UploadMediaRequestDto,
    profileId: number,
  ): UploadMediaCommand {
    // DTO의 string 타입을 Command의 bigint 타입으로 변환
    return new UploadMediaCommand(
      file,
      dto.ownerType,
      BigInt(dto.ownerId),
      BigInt(profileId),
    );
  }

  toGetMediaCommand(ownerType: OwnerType, ownerId: string): GetMediaCommand {
    // "3" 또는 "3,4,5" 형태를 배열로 변환
    const ownerIds = ownerId.split(',').map((id) => BigInt(id.trim()));
    return new GetMediaCommand(ownerType, ownerIds);
  }
}
