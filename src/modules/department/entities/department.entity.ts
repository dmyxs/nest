import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { UsersEntity } from '../../user/entities/user.entity';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity({ name: 'department' })
export class DepartmentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  departmentname: string;

  @OneToMany(() => UsersEntity, (user) => user.department)
  users: UsersEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.department)
  @JoinTable({ name: 'department_role' })
  roles: RoleEntity[];
}
