import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityDto } from '../createUniversityDTO/create.university.dto';

export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {}