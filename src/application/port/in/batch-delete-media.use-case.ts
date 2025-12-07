import { BatchDeleteMediaCommand } from "src/application/command/batch-delete-media.command";

export interface BatchDeleteMediaUseCase {
    execute(command: BatchDeleteMediaCommand): Promise<void>;
}