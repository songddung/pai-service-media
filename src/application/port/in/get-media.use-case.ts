import type { GetMediaResponseData } from 'pai-shared-types';
import { GetMediaCommand } from '../../command/get-media.command';

export interface GetMediaUseCase {
  execute(command: GetMediaCommand): Promise<GetMediaResponseData[]>;
}
