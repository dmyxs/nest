import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcryptjs';

import { ToolsService } from '../../utils/tools.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CacheService } from '../../common/db/redis-ceche.service';
import { UserService } from '../user/user.service';

import { UsersEntity } from '../user/entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly jwtService: JwtService,
    private readonly redisService: CacheService,
    private readonly userService: UserService,
  ) { }

  async create(user: CreateUserDto, maneger: EntityManager) {
    const { username, password } = user;
    const transformPass = hashSync(password);
    const exist = await this.usersRepository.findOne({ username });
    if (exist) ToolsService.fail('用户名已存在');
    // const roleEntity = await this.roleRepository.findOne({ id: roleId });
    // if (!roleEntity) ToolsService.fail('角色不存在');
    const userEntity = new UsersEntity();
    userEntity.password = transformPass;
    userEntity.username = username;
    // userEntity.roleId = roleId;
    // userEntity.roles = roleEntity;
    await maneger.save(userEntity);
    return '创建成功';
  }

  async validateUser(userinfo): Promise<any> {
    const { username, password } = userinfo;
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['username', 'password', 'id'],
    });
    if (!user) ToolsService.fail('用户名或密码不正确');
    //使用bcryptjs验证密码
    if (!compareSync(password, user.password)) {
      ToolsService.fail('用户名或密码不正确');
    }
    return user;
  }

  async login(user: any): Promise<any> {
    const { id } = user;
    const userResult = await this.userService.getRoleByUid(id);
    console.log(userResult);
    const access_token = this.jwtService.sign(userResult);
    await this.redisService.set(`user-token-${id}`, access_token, 60 * 60 * 24);
    return { access_token };
  }
}
