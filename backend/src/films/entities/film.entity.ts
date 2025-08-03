import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
} from 'typeorm';
import { ScheduleEnt } from './schedule.entity';

@Entity({ name: 'films', schema: 'public' })
@Check(`rating >= 0 AND rating <= 10`)
export class FilmEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  rating: number;

  @Column('varchar')
  director: string;

  @Column('varchar')
  tags: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  cover: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  about: string;

  @Column('varchar')
  description: string;

  @OneToMany(() => ScheduleEnt, (schedule) => schedule.film)
  schedules: ScheduleEnt[];
}
