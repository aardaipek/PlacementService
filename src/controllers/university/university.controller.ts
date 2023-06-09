import {
  Controller,
  Get,
  Req,
  Param,
  Delete,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { UniversityService } from '../../services/university/university.service';
import { CreateUniversityDto } from '../../core/dtos/create.university.dto';
import { UniversityRepository } from '../../core/repositories/university.repository';

@Controller('api/university')
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService,
    private readonly database: UniversityRepository,
  ) {}

  @Get('all')
  public async GetUniversities(@Req() request: Request) {
    try {
      const universities = await this.database.getAllUniversity();
      return universities;
    } catch (err) {
      return err;
    }
  }

  @Post('loadUniversity')
  public async InsertUniversity() {
    const universityData = await this.universityService.getUniversities();
    try {
      await Promise.all(
        universityData.map(async (university) => {
          await this.database.insertUniversity(university);
        }),
      );
      return true;
    } catch (err) {
      return err;
    }
  }

  @Get(':id/students')
  public async GetUniversity(@Param('id') id: string) {
    try {
      const university = await this.database.getUniversity(id);
      return university;
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  public async DeleteUniversity(@Param('id') id: string) {
    try {
      const deletedUniversity = await this.database.deleteUniversity(id);
      return deletedUniversity;
    } catch (err) {
      return err;
    }
  }
}
