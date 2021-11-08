import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { UsersEntity } from '../user/entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { CacheService } from '../../common/db/redis-ceche.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RoleEntity]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

    // 环境变量的写法，是异步的
    // JwtModule.registerAsync({
    //   useFactory() {
    //     return {
    //       secret: jwtConstants.secret,
    //       signOptions: { expiresIn: '60s' },
    //     };
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, CacheService],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }
