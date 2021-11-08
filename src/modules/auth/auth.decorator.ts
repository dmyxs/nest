import { createParamDecorator } from '@nestjs/common';

//data：使用@CurrentUser('xx')时，传递过来的参数xx
export const CurrentUser = createParamDecorator((data, req) => req.user);
