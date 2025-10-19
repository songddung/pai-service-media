import { IsEnum, IsString } from 'class-validator';
import type { OwnerType } from 'pai-shared-types';

export class UploadMediaRequestDto {
  @IsEnum(['profile', 'conversation'], {
    message: 'ownerType must be either "profile" or "conversation"',
  })
  ownerType: OwnerType;

  @IsString()
  ownerId: string;
}
