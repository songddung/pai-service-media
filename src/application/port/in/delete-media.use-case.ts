import { DeleteMediaCommand } from 'src/application/command/delete-media.command';

export interface DeleteMediaUseCase {
  execute(command: DeleteMediaCommand): Promise<void>;
}
