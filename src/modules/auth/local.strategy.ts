import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { compareSync } from 'bcryptjs';

//本地策略
//PassportStrategy接受两个参数：
//第一个：Strategy，你要用的策略，这里是passport-local，本地策略
//第二个：别名，可选，默认是passport-local的local，用于接口时传递的字符串
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  //validate是LocalStrategy的内置方法
  async validate(username: string, password: string): Promise<any> {
    //查询数据库，验证账号密码，并最终返回用户
    return await this.authService.validateUser({ username, password });
  }
}
