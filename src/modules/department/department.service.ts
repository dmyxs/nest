import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from '../../utils/tools.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';
import { RoleEntity } from '../role/entities/role.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { departmentname } = createDepartmentDto;
    const department = new DepartmentEntity();
    department.departmentname = departmentname;
    return await this.departmentRepository.save(department);
  }

  async assignRoleByDid(did, rid) {
    const department = await this.departmentRepository.findOne({ id: did });
    if (!department) ToolsService.fail('部门ID不存在');
    const role = await this.roleRepository.findOne({ id: rid });
    if (!role) ToolsService.fail('角色ID不存在');
    const roleEntityArr = [];
    roleEntityArr.push(role);
    department.roles = roleEntityArr;
    return await this.departmentRepository.save(department);
  }

  async findAll() {
    return await this.departmentRepository.find({
      relations: ['users', 'roles'],
    });
  }

  async getRoleByDid(id) {
    return this.departmentRepository.findOne({ id }, { relations: ['roles'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
