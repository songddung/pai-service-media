import { UploadMediaCommand } from 'src/application/command/upload-media.command';
import { UploadMediaResponseData } from 'pai-shared-types';
export interface UploadMediaUseCase {
  execute(command: UploadMediaCommand): Promise<UploadMediaResponseData>;
}
