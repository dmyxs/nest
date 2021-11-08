import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async create(@Body() Body) {
    return await this.roleService.create(Body);
  }

  @Post('auth')
  async assignAccessByRid(@Body() body) {
    const { rid, aid } = body;
    return this.roleService.assignAccessByRid(rid, aid);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('access/:id')
  async getAccessByRid(@Param('id') id: string) {
    return await this.roleService.getAccessByRid(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() relasion) {
    const relasionArr = relasion.relasion.split('-');
    return this.roleService.findOne(+id, relasionArr);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
