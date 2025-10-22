import { GetMediaCommand } from '../../command/get-media.command';
import { GetMediaResult } from './result/get-media.result';

export interface GetMediaUseCase {
  execute(command: GetMediaCommand): Promise<GetMediaResult[]>;
}
