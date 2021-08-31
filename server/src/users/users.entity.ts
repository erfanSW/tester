import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/roles.entity';
import { Tag } from 'src/tag/tag.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  phone: string;

  @ManyToOne(type => Role, {
    onDelete: 'SET NULL',
    eager: true,
  })
  role: Role;

  @ManyToOne(type => Tag, {
    onDelete: 'SET NULL',
    eager: true,
  })
  tag: Tag;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
