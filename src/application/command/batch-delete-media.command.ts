export class BatchDeleteMediaCommand {
  constructor(public readonly mediaIds: bigint[]) {}
}
