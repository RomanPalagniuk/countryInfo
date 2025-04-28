import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';

@Entity()
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.calendarEvents)
  @Exclude() 
  user: User;
}