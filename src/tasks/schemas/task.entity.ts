import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true })
  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
