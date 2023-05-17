import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UniversityDocument = HydratedDocument<University>;

@Schema()
export class University {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  quota: number;
  @Prop({ required: true })
  students: [];
}

export const UniversitySchema = SchemaFactory.createForClass(University);