import { IsString } from 'class-validator';
import type { BatchDeleteMediaRequestDto as IBatchDeleteMediaRequestDto } from 'pai-shared-types';

export class BatchDeleteMediaRequestDto implements IBatchDeleteMediaRequestDto {
  @IsString({ each: true })
  mediaIds: string[];
}
