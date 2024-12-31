import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { IQueryParams } from '@common/interfaces/decorators';
import { Attendance } from './entities/attendance.entity';
import { Member } from '@members/entities/member.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);

    return await this.eventRepository.save(event);
  }

  async findAll(queryParams: IQueryParams) {
    return await this.eventRepository.find(queryParams);
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event?.id) {
      throw new NotFoundException(`event with id: ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    return await this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.eventRepository.delete(id);
  }

  async registerAttendance(eventId: string, memberId: string) {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) {
      throw new Error('Event not found');
    }

    const member = await this.memberRepository.findOneBy({ id: memberId });
    if (!member) {
      throw new Error('Member not found');
    }

    const attendance = this.attendanceRepository.create({
      attended: false,
      event: event,
      Member: member,
    });

    return this.attendanceRepository.save(attendance);
  }

  async confirmAttendance(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });

    if (!attendance?.id) {
      throw new NotFoundException(`attendance with id: ${id} not found`);
    }

    return await this.attendanceRepository.update(id, { attended: true });
  }

  async nonAttendance(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });

    if (!attendance?.id) {
      throw new NotFoundException(`attendance with id: ${id} not found`);
    }

    return await this.attendanceRepository.update(id, { attended: false });
  }
}
