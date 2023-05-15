import { Document } from 'mongoose';

export interface IStudent extends Document{
    readonly name: string;
    readonly lastname: string;
    score: number;
}
