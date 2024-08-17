import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionInfo = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(key);
    return key
      ? request.session.then((session) => session[key])
      : request.session;
  },
);
