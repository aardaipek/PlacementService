import { Document } from 'mongoose';
import { Student } from '../schemas/student';

export interface IUniversity extends Document{
    readonly name: string;
    readonly quota: number;
    students: Student[];
}
