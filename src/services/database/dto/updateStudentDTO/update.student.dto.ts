import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from '../createStudentDTO/create.student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}