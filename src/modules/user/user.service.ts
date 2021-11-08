import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from './entities/user.entity';
import { DepartmentEntity } from '../department/entities/department.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { AccessEntity } from '../access/entities/access.entity';
import { ToolsService } from '../../utils/tools.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentEntity: Repository<DepartmentEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
  ) { }

  async assignRoleByUserId(uid: number, rid: number) {
    const user = await this.usersRepository.findOne({ id: uid });
    if (!user) ToolsService.fail('用户ID不存在');
    const role = await this.roleEntity.findOne({ id: rid });
    if (!role) ToolsService.fail('角色ID不存在');
    const arr = [role];
    user.roles = arr;
    return await this.usersRepository.save(user);
  }

  async assignDepartmentByUserId(uid: number, did: number) {
    const user = await this.usersRepository.findOne({ id: uid });
    if (!user) ToolsService.fail('用户ID不存在');
    const daparment = await this.departmentEntity.findOne({ id: did });
    if (!daparment) ToolsService.fail('部门ID不存在');
    user.department = daparment;
    return await this.usersRepository.save(user);
  }

  async getAccessByUid(uid: number) {
    const sql = `
    select 
    access.* 
    from
    user, department, role, department_role as dr, access, role_access as ra
    where 
    user.department_id = department.id
    and department.id = dr.departmentId
    and role.id = dr.roleId
    and role.id = ra.roleId
    and access.id = ra.accessId
    and user.id = ${uid}`;
    const result = await this.usersRepository.query(sql);

    // const result = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .where('user.id = :id', { id: id })
    //   .innerJoinAndSelect(
    //     DepartmentEntity,
    //     'department',
    //     'user.department = department.id',
    //   )
    //   .innerJoinAndSelect(RoleEntity, 'role')
    //   .innerJoinAndSelect(
    //     'department_role',
    //     'd_t',
    //     'role.id = d_t.roleId and department.id = d_t.departmentId',
    //   )
    //   .innerJoinAndSelect(AccessEntity, 'access')
    //   .innerJoinAndSelect(
    //     'role_access',
    //     'r_a',
    //     'role.id = r_a.roleId and access.id = r_a.accessId',
    //   )
    //   .getRawMany();
    return result;
  }

  async getRoleByUid(uid: number) {
    const user = await this.usersRepository.findOne(
      { id: uid },
      { relations: ['roles'] },
    );
    if (!user) ToolsService.fail('用户ID不存在');
    console.log(user);

    const sql = `
    select 
    user.id as user_id, user.username, user.department_id, department.departmentname, role.id as role_id, rolename
    from
    user, department, role, department_role as dr
    where 
    user.department_id = department.id
    and department.id = dr.departmentId
    and role.id = dr.roleId
    and user.id = ${uid}`;
    const result = await this.usersRepository.query(sql);
    const userinfo = result[0];
    const userObj = {
      user_id: userinfo.user_id,
      username: userinfo.username,
      department_id: userinfo.department_id,
      departmentname: userinfo.departmentname,
      roles: [{ id: userinfo.role_id, rolename: userinfo.rolename }],
    };

    if (user.roles.length > 0) {
      const _user = JSON.parse(JSON.stringify(user));
      userObj.roles = [...userObj.roles, ..._user.roles];
    }
    return userObj;
  }

  async findAll() {
    return await this.usersRepository.findAndCount({
      relations: ['department'],
    });
  }

  async findOne(id: number) {
    const result = await this.usersRepository.findOne(id, {
      relations: ['roles', 'department'],
    });
    if (!result) ToolsService.fail('用户id不存在');
    return result;
  }

  async update(id: number, user: UpdateUserDto) {
    const { username } = user;
    const idIsExist = await this.usersRepository.findOne(id);
    if (!idIsExist) ToolsService.fail('用户id不存在');
    if (username) {
      const userIsExist = await this.usersRepository.findOne({ username });
      if (userIsExist) ToolsService.fail('用户名已存在');
    }
    return await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<any> {
    const result = await this.usersRepository.findOne(id);
    if (!result) ToolsService.fail('用户id不存在');
    return await this.usersRepository.remove(result);
  }
}
