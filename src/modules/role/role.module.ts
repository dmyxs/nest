import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from './entities/role.entity';
import { AccessEntity } from '../access/entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, AccessEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
