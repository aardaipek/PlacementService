import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  Delete,
  Request,
} from '@nestjs/common';
import { RequestService } from '../../services/request/request.service';

@Controller('student')
export class StudentController {
  constructor(private readonly requestService: RequestService) {}
  @Get(':id')
  async GetStudent(@Param('id') id: number) {
    return id + ' id li ogrenci';
  }

  @Get()
  async GetAllStudents(@Req() request: Request) {
    const result = await this.requestService.getStudents();
    return result;
  }

  @Post()
  async AddStudent(@Body() data) {
    return data;
  }

  @Delete(':id')
  async DeleteStudent(@Param('id') id: number) {
    return id + ' id li ogrenci silindi';
  }
}
