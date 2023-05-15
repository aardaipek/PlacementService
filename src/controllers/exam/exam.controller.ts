import { Controller, Get, Param } from '@nestjs/common';
import { ValidationService } from '../../services/validation/validation.service';
import { ExamService } from '../../services/exam/exam.service';

@Controller('exam')
export class ExamController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly examService: ExamService,
  ) {}

  @Get('startExam/:examDate')
  public async StartExam(@Param('examDate') examDate: string) {
    const date = this.validationService.formatDate(examDate);

    const results = await this.examService.takeExam(date);

    return results;
  }

}
