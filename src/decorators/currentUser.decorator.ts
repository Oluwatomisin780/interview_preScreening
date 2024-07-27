import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

const getCurrentUser = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUser(context),
);
