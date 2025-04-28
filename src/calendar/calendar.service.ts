import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { User } from '../users/user.entity';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import axios, { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';

interface Holiday {
  localName: string;
  date: string;
}

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarRepository: Repository<CalendarEvent>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addHolidays(userId: string, addHolidaysDto: AddHolidaysDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }, 
      relations: ['calendarEvents'] 
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { countryCode, year, holidays } = addHolidaysDto;

    const response: AxiosResponse<Holiday[]> = await axios.get(
      `${process.env.PUBLIC_HOLIDAYS_URL}/${year}/${countryCode}`,
    );

    let holidaysList = response.data;

    if (holidays && holidays.length > 0) {
      holidaysList = holidaysList.filter((holiday) =>
        holidays.includes(holiday.localName),
      );
    }

    const calendarEvents = holidaysList.map((holiday) => {
      const event = new CalendarEvent();
      event.name = holiday.localName;
      event.date = holiday.date;
      event.user = user;
      return event;
    });

    await this.calendarRepository.save(calendarEvents);

    user.calendarEvents = [...user.calendarEvents, ...calendarEvents];
    
    const userResponse = {
      id: user.id,
      email: user.email,
      calendarEvents: user.calendarEvents.map((event) => ({
        id: event.id,
        name: event.name,
        date: event.date,
      })),
    };
    
    return userResponse;
  }
}
