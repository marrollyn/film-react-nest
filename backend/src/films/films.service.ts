import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { FilmsRepositoryPSQL } from '../repository/filmsPSQL.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmsRepositoryPSQL) {}

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
