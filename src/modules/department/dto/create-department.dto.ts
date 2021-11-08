import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: '部门名字不能为空' })
  departmentname: string;
}
