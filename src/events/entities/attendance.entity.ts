import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Member } from '@members/entities/member.entity';

@Entity('Attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bool', { default: false, nullable: true })
  attended: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Event, (event) => event.attendances)
  event: Event;

  @ManyToOne(() => Member, (members) => members.attendances)
  Member: Member;
}