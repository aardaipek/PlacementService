import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @MaxLength(70)
    @IsNotEmpty()
    readonly name: string;
 
    @IsString()
    @MaxLength(70)
    @IsNotEmpty()
    readonly lastname: string;

    @IsNumber()
    @IsNotEmpty()
    readonly score: number;
}
