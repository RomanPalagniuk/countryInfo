import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CalendarEvent } from '../calendar/calendar-event.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  email: string;

  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.user)
  @Exclude()
  calendarEvents: CalendarEvent[];
}