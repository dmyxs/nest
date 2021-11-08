import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { UsersEntity } from './user.entity';

@Entity({ name: 'star' })
export class StarEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => UsersEntity, (user) => user.follows)
  followers: UsersEntity;
}
