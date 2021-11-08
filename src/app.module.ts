import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { UserModule } from 'modules/user/user.module';
import { AuthModule } from 'modules/auth/auth.module';
import { RoleModule } from 'modules/role/role.module';
import { AccessModule } from 'modules/access/access.module';
import { DepartmentModule } from 'modules/department/department.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('mysql'),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('redis'),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60, //1分钟
      limit: 60, //请求60次，超过则报status为429的错误
    }),
    UserModule,
    AuthModule,
    RoleModule,
    AccessModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
