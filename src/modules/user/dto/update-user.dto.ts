import {
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  ValidateIf,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', example: 'kitty', required: false })
  @IsOptional()
  username: string;

  @ApiProperty({ description: '密码', example: '12345678', required: false })
  @IsOptional()
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  @ApiProperty({
    description: '邮箱',
    example: 'llovenest@163.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: '邮箱格式错误' })
  @ValidateIf((o) => o.username === 'admin')
  email: string;

  @ApiProperty({
    description: '手机号码',
    example: '13866668888',
    required: false,
  })
  @IsOptional()
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  mobile: string;

  @ApiProperty({
    description: '性别',
    example: 'female',
    required: false,
    enum: ['male', 'female'],
  })
  @IsOptional()
  @IsEnum(['male', 'female'], {
    message: 'gender只能传入字符串male或female',
  })
  gender: string;

  @ApiProperty({
    description: '状态',
    example: 1,
    required: false,
    enum: [0, 1],
  })
  @IsOptional()
  @IsEnum(
    { 禁用: 0, 可用: 1 },
    {
      message: 'status只能传入数字0或1',
    },
  )
  @Type(() => Number)
  status: number;
}
