import { SetMetadata } from '@nestjs/common';

//SetMetadata作用：将获取到的值，设置到元数据中，然后守卫通过反射器才能获取到值
export const Roles = (...args: string[]) => SetMetadata('roles', args);
