import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'kitty', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ example: '12345678', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  // @ApiProperty({ example: 1, description: '角色id' })
  // @IsNotEmpty({ message: '角色id不能为空' })
  // roleId: number;
}
