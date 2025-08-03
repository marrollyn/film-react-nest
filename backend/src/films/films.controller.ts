import { Controller, Param, Get } from '@nestjs/common';
import { FilmDTO } from './dto/film.dto';
import { FilmsService } from './films.service';
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<{ total: number; items: FilmDTO[] }> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findByID(@Param('id') id: string) {
    return this.filmsService.findByID(id);
  }
}
