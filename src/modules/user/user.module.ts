import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller'; //普通
import { UserService } from './user.service'; //普通

import { UsersEntity } from './entities/user.entity';
import { DepartmentEntity } from '../department/entities/department.entity';
import { RoleEntity } from '../role/entities/role.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, DepartmentEntity, RoleEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
