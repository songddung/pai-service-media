import { ownerType } from '../port/in/enum/owner-type';

export class GetMediaCommand {
  constructor(
    public readonly ownerType: ownerType,
    public readonly ownerIds: bigint[],
  ) {}
}
