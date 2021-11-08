import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { UsersEntity } from '../../user/entities/user.entity';
import { DepartmentEntity } from '../../department/entities/department.entity';
import { AccessEntity } from '../../access/entities/access.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  rolename: string;

  @ManyToMany(() => UsersEntity, (user) => user.roles)
  users: UsersEntity[];

  @ManyToMany(() => DepartmentEntity, (department) => department.roles)
  department: DepartmentEntity[];

  @ManyToMany(() => AccessEntity, (access) => access.roles)
  @JoinTable({ name: 'role_access' })
  access: AccessEntity[];
}
