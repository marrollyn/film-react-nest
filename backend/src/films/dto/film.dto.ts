//TODO описать DTO для запросов к /films
import { ScheduleDTO } from './schedule.dto';

export class FilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleDTO[];
}
