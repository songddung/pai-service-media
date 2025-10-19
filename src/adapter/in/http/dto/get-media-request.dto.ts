import { IsEnum, IsString } from 'class-validator';
import type { OwnerType, GetMediaRequestDto as IGetMediaRequestDto } from 'pai-shared-types';

export class GetMediaRequestDto implements Omit<IGetMediaRequestDto, 'ownerIds'> {
  @IsEnum(['profile', 'conversation'], {
    message: 'ownerType must be either "profile" or "conversation"',
  })
  ownerType: OwnerType;

  @IsString()
  ownerId: string; // "3" 또는 "3,4,5" 형태 (컨트롤러에서 배열로 변환)
}
