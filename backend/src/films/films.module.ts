import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEnt } from './entities/film.entity';
import { ScheduleEnt } from './entities/schedule.entity';
import { FilmsRepositoryPSQL } from '../repository/filmsPSQL.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEnt, ScheduleEnt])],
  providers: [FilmsService, FilmsRepositoryPSQL],
  controllers: [FilmsController],
  exports: [FilmsRepositoryPSQL],
})
export class FilmsModule {}
