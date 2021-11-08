import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
// import { CurrentUser } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @Transaction()
  async create(
    @Body() user: CreateUserDto,
    @TransactionManager() maneger: EntityManager,
  ) {
    return await this.authService.create(user, maneger);
  }

  @Post('login')
  @UseGuards(AuthGuard('local')) //本地策略，传递local
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @Get('user')
  @UseGuards(AuthGuard('jwt')) //jwt策略，身份鉴权
  //通过req获取到被验证后的user，也可以使用装饰器
  getProfile(@Request() req) {
    console.log('req', req.user);
    return req.user;
  }

  //装饰器写法
  //DocumentType<User>，传递实体或模型进去，就可以使用数据库的文档
  // getProfile(@CurrentUser() user: DocumentType<User>) {
  //   return user;
  // }
}
