import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from '../document/document.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(type => Document, {
    onDelete: 'SET NULL',
    eager: true,
  })
  document: number;

  @ManyToOne(type => Users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  author: number;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
