// Commons
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { StudentModule } from './modules/student.module';
import { UniversityModule } from './modules/university.module';
// Controllers
import { StudentController } from './controllers/student/student.controller';
import { UniversityController } from './controllers/university/university.controller';
import { ExamController } from './controllers/exam/exam.controller';
// Services 
import { RequestService } from './services/request/request.service';
import { StudentService } from './services/student/student.service';
import { UtilService } from './services/utils/util.service';
import { ExamService } from './services/exam/exam.service';
import { UniversityService } from './services/university/university.service';
// Repository
import { StudentRepository } from './core/repositories/student/student.repository';
import { UniversityRepository } from './core/repositories/university/university.repository';
import {StudentSchema,UniversitySchema} from './core/schema/schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([
      { name: 'student', schema: StudentSchema },
      { name: 'university', schema: UniversitySchema },
    ]),
    StudentModule,
    UniversityModule,
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
