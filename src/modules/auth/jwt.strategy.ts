import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { CacheService } from '../../common/db/redis-ceche.service';
import { Request } from 'express';
import { ToolsService } from '../../utils/tools.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisService: CacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'), //使用ExtractJwt.fromHeader从header获取token
      ignoreExpiration: false, //如果为true，则不验证令牌的过期时间。
      secretOrKey: jwtConstants.secret, //使用密钥解析，可以使用process.env.xxx
      passReqToCallback: true,
    } as StrategyOptions);
  }

  //token验证, payload是super中已经解析好的token信息
  async validate(req: Request, payload: any) {
    console.log('payload', payload);
    const { id } = payload;
    const token = ExtractJwt.fromHeader('token')(req);
    const cacheToken = await this.redisService.get(`user-token-${id}`);

    //单点登陆验证
    if (token !== JSON.parse(cacheToken)) {
      ToolsService.fail('您账户已经在另一处登陆，请重新登陆', 401);
    }
    return { username: payload.username };
  }
}
