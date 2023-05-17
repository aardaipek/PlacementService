import { Document } from 'mongoose';
import { Student } from 'src/core/schema/schema';

export interface IUniversity extends Document{
    readonly name: string;
    readonly quota: number;
    students: Student[];
}
