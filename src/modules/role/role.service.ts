import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ToolsService } from '../../utils/tools.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { AccessEntity } from '../access/entities/access.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
  ) { }

  async create(body) {
    return await this.roleRepository.save(body);
  }

  async assignAccessByRid(rid, aidArr) {
    const role = await this.roleRepository.findOne({ id: rid });
    if (!role) ToolsService.fail('角色ID不存在');
    if (aidArr.length > 1) {
      const accessEntityArr = [];

      aidArr.forEach(async (aid) => {
        const access = await this.accessRepository.findOne({ id: aid });
        if (!access) ToolsService.fail('权限ID不存在');
        accessEntityArr.push(access);
      });

      role.access = accessEntityArr;
      return await this.roleRepository.save(role);
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: ['access', 'department', 'users'],
    });
  }

  async getAccessByRid(id) {
    return await this.roleRepository.findOne({ id }, { relations: ['access'] });
  }

  async findOne(id: number, relations?) {
    if (relations) {
      return await this.roleRepository.findOne({ id }, { relations });
    }
    return await this.roleRepository.findOne({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
