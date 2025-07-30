import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schema/film.schema';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from '../repository/films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [FilmsService, FilmsRepository],
  controllers: [FilmsController],
  exports: [FilmsRepository],
})
export class FilmsModule {}
