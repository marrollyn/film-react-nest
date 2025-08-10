import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schedule, ScheduleSchema } from './schedule.schema';

@Schema({ timestamps: true })
export class Film {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: Number, required: true, min: 0, max: 10 })
  rating: number;

  @Prop({ type: String, required: true })
  director: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  cover: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  about: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [ScheduleSchema], default: [] })
  schedule: Schedule[];
}

export type FilmDocument = HydratedDocument<Film>;
export const FilmSchema = SchemaFactory.createForClass(Film);
