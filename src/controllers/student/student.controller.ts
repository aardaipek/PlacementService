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
import { CreateStudentDto } from '../../core/dtos/create.student.dto';
import { StudentRepository } from '../../core/repositories/student.repository';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly requestService: RequestService,
    private readonly database: StudentRepository,
  ) {}

  @Get(':id')
  public async GetStudent(@Param('id') id: string) {
    try{
      const student = await this.database.getStudent(id);
      return student;
    }catch(err){
      return err;
    }
  }

  @Get('all')
  public async GetAllStudents(@Req() request: Request) {
    try{
      const students = await this.database.getAllStudents();
      return students;
    }catch(err){
      return err;
    }
  }

  @Post('create')
  public async AddStudent(@Body() data: CreateStudentDto) {
    try{
      const newStudent = await this.database.createStudent(data);
      return newStudent;
    }catch(err){
      return err;
    }
  }

  @Delete(':id')
  public async DeleteStudent(@Param('id') id: string) {
    try{
      const deletedStudent = await this.database.deleteStudent(id);
      return deletedStudent;
    }catch(err){
      return err;
    }
  }
}
