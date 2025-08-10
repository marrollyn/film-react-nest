import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schema/film.schema';
import { Schedule } from 'src/films/schema/schedule.schema';
import { FilmDTO } from '../films/dto/film.dto';
import { ScheduleDTO } from '../films/dto/schedule.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  private filmToDTO(film: FilmDocument): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map(
        (schedule) =>
          ({
            id: schedule.id,
            daytime: schedule.daytime,
            hall: schedule.hall,
            rows: schedule.rows,
            seats: schedule.seats,
            price: schedule.price,
            taken: schedule.taken,
          }) as ScheduleDTO,
      ),
    };
  }

  private DTOtoFilm(dto: FilmDTO): Partial<Film> {
    return {
      id: dto.id,
      rating: dto.rating,
      director: dto.director,
      tags: dto.tags,
      image: dto.image,
      cover: dto.cover,
      title: dto.title,
      about: dto.about,
      description: dto.description,
      schedule: dto.schedule.map(
        (schedule) =>
          ({
            id: schedule.id,
            daytime: schedule.daytime,
            hall: schedule.hall,
            rows: schedule.rows,
            seats: schedule.seats,
            price: schedule.price,
            taken: schedule.taken,
          }) as Schedule,
      ),
    };
  }

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.filmModel.find().exec();
    return films.map((film) => this.filmToDTO(film));
  }

  async findByID(id: string): Promise<FilmDTO | null> {
    const film = await this.filmModel.findOne({ id }).exec();
    return film ? this.filmToDTO(film) : null;
  }

  async findSchedule(id: string): Promise<ScheduleDTO[]> {
    const film = await this.findByID(id);
    const schedule = film ? film.schedule : [];
    return schedule;
  }

  async addSeat(
    filmID: string,
    sessionID: string,
    seat: string,
  ): Promise<void> {
    try {
      await this.filmModel
        .updateOne(
          { id: filmID, 'schedule.id': sessionID },
          { $addToSet: { 'schedule.$.taken': seat } },
        )
        .exec();
    } catch (error) {
      throw new ConflictException('ошибка записи выбранных мест');
    }
  }
}
