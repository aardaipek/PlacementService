import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Student>;
export type UniversityDocument = HydratedDocument<University>;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  score: number;
}

@Schema()
export class University {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  quota: number;
  @Prop({ required: true })
  students: [];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
export const UniversitySchema = SchemaFactory.createForClass(University);