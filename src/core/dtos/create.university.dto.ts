import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Student } from "../schemas/student";

export class CreateUniversityDto {
    @IsString()
    @MaxLength(70)
    @IsNotEmpty()
    readonly name: string;
 
    @IsString()
    @MaxLength(70)
    @IsNotEmpty()
    readonly quota: number;

    students: Student[];
}
