import { UploadMediaCommand } from 'src/application/command/upload-media.command';
import { UploadMediaResult } from './result/upload-media.result';
export interface UploadMediaUseCase {
  execute(command: UploadMediaCommand): Promise<UploadMediaResult>;
}
