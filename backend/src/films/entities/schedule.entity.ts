import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { FilmEnt } from './film.entity';

@Entity({ name: 'schedules', schema: 'public' })
export class ScheduleEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  daytime: string;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('double precision')
  price: number;

  @Column('text')
  taken: string;

  @ManyToOne(() => FilmEnt, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: FilmEnt;

  @RelationId((schedule: ScheduleEnt) => schedule.film)
  filmId: string;
}
