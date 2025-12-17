import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Auth = createParamDecorator(
  (field: 'userId' | 'profileId' | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const { auth } = req;

    if (!field) {
      return auth
        ? {
            userId: auth.userId ? Number(auth.userId) : undefined,
            profileId: auth.profileId ? Number(auth.profileId) : undefined,
          }
        : undefined;
    }

    const value = auth?.[field];
    return value !== undefined && value !== null ? Number(value) : undefined;
  },
);
