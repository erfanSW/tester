import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from 'src/users/users.entity';
import { Tag } from 'src/tag/tag.entity';

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

  @ManyToOne(type => Tag, {
    onDelete: 'SET NULL',
    eager: true,
  })
  tag: number;

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
