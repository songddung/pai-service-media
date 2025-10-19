import { OwnerType } from 'pai-shared-types';

export class GetMediaCommand {
  constructor(
    public readonly ownerType: OwnerType,
    public readonly ownerIds: bigint[],
  ) {}
}
