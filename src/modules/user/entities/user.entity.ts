import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { RoleEntity } from '../../role/entities/role.entity';
import { PhotoEntity } from './photo.entity';
import { AvatarEntity } from './avatar.entity';
import { StarEntity } from './star.entity';
import { DepartmentEntity } from '../../department/entities/department.entity';

@Entity({ name: 'user' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 100,
    nullable: false,
    select: false,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 11,
    select: false,
    nullable: true,
    comment: '手机号码',
  })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 50,
    select: false,
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'], //枚举类型，只能说数组中的值
    default: 'male', //默认值，stirng，可以使用函数
  })
  gender: string;

  @Column({
    type: 'tinyint',
    default: () => 18,
  })
  age: number;

  @Column({
    type: 'tinyint',
    default: () => 1,
    comment: '0：禁用，1：可用',
  })
  status: number;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.users)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @OneToMany(() => PhotoEntity, (avatar) => avatar.userinfo)
  photos: PhotoEntity;

  @ManyToMany(() => StarEntity, (star) => star.followers)
  @JoinTable()
  follows: StarEntity[]; //注意这里是数组类型

  @OneToOne(() => AvatarEntity, (avatar) => avatar.userinfo)
  avatar: AvatarEntity;
}
