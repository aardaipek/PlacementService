import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from '../dtos/create.student.dto';
import { UpdateStudentDto } from '../dtos/update.student.dto';
import { CreateUniversityDto } from '../dtos/create.university.dto';
import { UpdateUniversityDto } from '../dtos/update.university.dto';
import { IStudent } from '../interfaces/student.interface';
import { IUniversity } from '../interfaces/university.interface';
import { Model } from 'mongoose';
import { RequestService } from '../../services/request/request.service';
import { UniversityService } from '../../services/university/university.service';
import { StudentService } from '../../services/student/student.service';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('student') private studentModel: Model<IStudent>,
    @InjectModel('university') private universityModel: Model<IUniversity>,
    private readonly requestService: RequestService,
    private readonly universityService: UniversityService,
    private readonly studentService: StudentService,
  ) {}

}
