import { IsEnum, IsString } from 'class-validator';
import type {
  OwnerType,
  UploadMediaRequestDto as IUploadMediaRequestDto,
} from 'pai-shared-types';

export class UploadMediaRequestDto implements IUploadMediaRequestDto {
  @IsEnum(['profile', 'conversation'], {
    message: 'ownerType must be either "profile" or "conversation"',
  })
  ownerType: OwnerType;

  @IsString()
  ownerId: number;
}
