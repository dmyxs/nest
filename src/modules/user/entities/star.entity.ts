import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity({ name: 'star' })
export class StarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => UsersEntity, (user) => user.follows)
  followers: UsersEntity;
}
