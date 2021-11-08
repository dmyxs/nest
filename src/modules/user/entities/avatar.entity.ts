import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { UsersEntity } from './user.entity';

@Entity({ name: 'avatar' })
export class AvatarEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  url: string;

  @OneToOne(() => UsersEntity, (user) => user.avatar)
  @JoinColumn({ name: 'userinfo_id' })
  userinfo: UsersEntity;
}
