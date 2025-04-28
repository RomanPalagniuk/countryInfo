import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { CalendarEvent } from './calendar-event.entity'; 
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, User])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}