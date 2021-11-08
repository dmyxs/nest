import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'common/guard/auth.guard';
import { Roles } from 'common/decorator/role.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll() {
    const [data, count] = await this.userService.findAll();
    return { count, data };
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.findOne(id);
  }

  @Get('access/:id')
  async getAccessByUid(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getAccessByUid(id);
  }

  @Get('role/:id')
  async getRoleByUid(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getRoleByUid(id);
  }

  @Post('auth/role/:id')
  async assignRoleByUserId(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body,
  ) {
    const { rid } = body;
    return await this.userService.assignRoleByUserId(id, rid);
  }

  @Post('auth/department')
  async assignDepartmentByUserId(@Body() body) {
    const { uid, did } = body;
    return await this.userService.assignDepartmentByUserId(uid, did);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.remove(id);
  }
}
