import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../roles/roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @ManyToOne(type => Role, {
    onDelete: 'SET NULL',
  })
  role: number;
}
