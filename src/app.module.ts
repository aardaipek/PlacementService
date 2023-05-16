import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './controllers/student/student.controller';
import { UniversityController } from './controllers/university/university.controller';
import { ExamController } from './controllers/exam/exam.controller';
import { RequestService } from './services/request/request.service';
import { HttpModule } from '@nestjs/axios';
import { ValidationService } from './services/validation/validation.service';
import { DatabaseService } from './services/database/database.service';
import { ExamService } from './services/exam/exam.service';
import { UniversityService } from './services/university/university.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudentSchema,
  UniversitySchema,
} from './services/database/schema/schema';
import { StudentService } from './services/student/student.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot("mongodb+srv://admin:admin@university.0a0kcgt.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forFeature([
      { name: 'student', schema: StudentSchema },
      { name: 'university', schema: UniversitySchema },
    ]),
  ],
  controllers: [
    AppController,
    StudentController,
    UniversityController,
    ExamController,
  ],
  providers: [
    AppService,
    RequestService,
    ValidationService,
    DatabaseService,
    ExamService,
    UniversityService,
    StudentService,
  ],
})
export class AppModule {}
