import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity({ name: 'avatar' })
export class AvatarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @OneToOne(() => UsersEntity, (user) => user.avatar)
  @JoinColumn({ name: 'userinfo_id' })
  userinfo: UsersEntity;
}
