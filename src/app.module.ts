import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './controllers/student/student.controller';
import { UniversityController } from './controllers/university/university.controller';
import { ExamController } from './controllers/exam/exam.controller';
import { RequestService } from './services/request/request.service';
import { HttpModule } from '@nestjs/axios';
import { UtilService } from './services/utils/util.service';
import { ExamService } from './services/exam/exam.service';
import { UniversityService } from './services/university/university.service';
import { MongooseModule } from '@nestjs/mongoose';
import {StudentSchema,UniversitySchema} from './core/schema/schema';
import { StudentService } from './services/student/student.service';
import { StudentRepository } from './core/repositories/student/student.repository';
import { UniversityRepository } from './core/repositories/university/university.repository';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([
      { name: 'student', schema: StudentSchema },
      { name: 'university', schema: UniversitySchema },
    ]),
  ],
  controllers: [
    AppController,
    UniversityController,
    ExamController,
    StudentController,
  ],
  providers: [
    AppService,
    RequestService,
    UtilService,
    StudentRepository,
    UniversityRepository,
    ExamService,
    UniversityService,
    StudentService,
  ],
})
export class AppModule {}
