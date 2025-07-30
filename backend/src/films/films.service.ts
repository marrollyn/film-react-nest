import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmsRepository) {}

  async findAll() {
    const films = await this.repository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async findByID(id: string) {
    const film = await this.repository.findByID(id);
    if (!film) {
      throw new NotFoundException(`фильм не найден`);
    }
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
