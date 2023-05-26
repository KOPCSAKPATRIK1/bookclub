import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './members.entity';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Members)
  @JoinColumn({ name: 'member_id' })
  member_id: number;

  @Column()
  amount: number;

  @Column()
  paid_at: Date;
}
