import { Controller, Get, Req, Param, Delete, Request } from '@nestjs/common';
import { UniversityService } from '../../services/university/university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}
  @Get('getAll')
  public async GetUniversities(@Req() request: Request) {
    return await this.universityService.getUniversities();
  }

  @Get(':id/students')
  public async GetAllStudents(@Param('id') id: number) {
    return id + ' idli universitenin öğrencileri';
  }

  @Delete(':id')
  public async DeleteUniversity(@Param('id') id: number) {
    return id + ' idli university silindi';
  }
}
