import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  daytime: string;

  @Prop({ type: Number, required: true })
  hall: number;

  @Prop({ type: Number, required: true })
  rows: number;

  @Prop({ type: Number, required: true })
  seats: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export type ScheduleDocument = HydratedDocument<Schedule>;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
