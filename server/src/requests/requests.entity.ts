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
import { RequestState } from './interface/requests.interface';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: RequestState.UNKNOWN })
  state: number;

  @ManyToOne(type => Document, {
    onDelete: 'SET NULL',
    eager: true,
  })
  document: number;

  @ManyToOne(type => Users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  applicant: number;

  @ManyToOne(type => Users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  doctor: number;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
