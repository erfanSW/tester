import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  data: string;

  @ManyToOne(type => Users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  doctor: number;

  @ManyToOne(type => Users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  patient: number;

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
