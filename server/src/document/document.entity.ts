import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
}
