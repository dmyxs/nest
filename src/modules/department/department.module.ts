import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentEntity } from './entities/department.entity';
import { RoleEntity } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, RoleEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule { }
