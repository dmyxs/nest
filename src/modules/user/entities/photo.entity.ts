import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'utils/baseEntity';
import { UsersEntity } from './user.entity';

@Entity({ name: 'photo' })
export class PhotoEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => UsersEntity, (user) => user.photos)
  @JoinColumn({ name: 'userinfo_id' })
  userinfo: UsersEntity;
}
