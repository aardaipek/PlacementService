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
import { CreateStudentDto } from '../../services/database/dto/createStudentDTO/create.student.dto';
import { DatabaseService } from '../../services/database/database.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly requestService: RequestService,
    private readonly database: DatabaseService,
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

  @Get()
  public async GetAllStudents(@Req() request: Request) {
    try{
      const students = await this.database.getAllStudents();
      return students;
    }catch(err){
      return err;
    }
  }

  @Post()
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
