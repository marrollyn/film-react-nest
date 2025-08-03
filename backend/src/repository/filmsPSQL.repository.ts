import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDTO } from '../films/dto/film.dto';
import { ScheduleDTO } from '../films/dto/schedule.dto';
import { FilmEnt } from '../films/entities/film.entity';
import { ScheduleEnt } from '../films/entities/schedule.entity';

@Injectable()
export class FilmsRepositoryPSQL {
  constructor(
    @InjectRepository(FilmEnt)
    private readonly filmRepo: Repository<FilmEnt>,
    @InjectRepository(ScheduleEnt)
    private readonly scheduleRepo: Repository<ScheduleEnt>,
    private readonly dataSource: DataSource,
  ) {}

  private filmToDTO(film: FilmEnt): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags
        ? film.tags
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedules
        .sort((a, b) => {
          const dateA = new Date(a.daytime);
          const dateB = new Date(b.daytime);
          return dateA.getTime() - dateB.getTime();
        })
        .map(
          (schedule) =>
            ({
              id: schedule.id,
              daytime: schedule.daytime,
              hall: schedule.hall,
              rows: schedule.rows,
              seats: schedule.seats,
              price: schedule.price,
              taken: schedule.taken
                ? schedule.taken
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
            }) as ScheduleDTO,
        ),
    };
  }

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.filmRepo.find({
      relations: ['schedules'],
    });
    return films.map((film) => this.filmToDTO(film));
  }

  async findByID(id: string): Promise<FilmDTO | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });
    return film ? this.filmToDTO(film) : null;
  }

  async findSchedule(id: string): Promise<ScheduleDTO[]> {
    const film = await this.findByID(id);
    const schedule = film.schedule;
    return schedule ? schedule : [];
  }

  async addSeat(
    filmID: string,
    sessionID: string,
    seat: string,
  ): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        const session = await manager.getRepository(ScheduleEnt).findOne({
          where: { id: sessionID },
          lock: { mode: 'pessimistic_write' },
        });

        if (!session) {
          throw new NotFoundException('сеанс не найден');
        }

        const takenSeats = session.taken
          ? session.taken
              .split(',')
              .map((seat) => seat.trim())
              .filter(Boolean)
          : [];

        if (takenSeats.includes(seat)) {
          throw new ConflictException('место занято');
        }

        session.taken = [...takenSeats, seat].join(',');
        await manager.getRepository(ScheduleEnt).save(session);
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new ConflictException('ошибка записи выбранных мест');
    }
  }
}
