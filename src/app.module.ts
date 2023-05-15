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

@Module({
  imports: [HttpModule],
  controllers: [AppController, StudentController, UniversityController, ExamController],
  providers: [AppService, RequestService, ValidationService, DatabaseService, ExamService, UniversityService],
})
export class AppModule {}
