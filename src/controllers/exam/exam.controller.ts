import { Controller, Get, Param } from '@nestjs/common';
import { UtilService } from '../../services/utils/util.service';
import { ExamService } from '../../services/exam/exam.service';

@Controller('api/exam')
export class ExamController {
  constructor(
    private readonly utilService: UtilService,
    private readonly examService: ExamService,
  ) {}

  @Get('start/:examDate')
  public async StartExam(@Param('examDate') examDate: string) {
    const date = this.utilService.formatDate(examDate);

    const results = await this.examService.takeExam(date);

    return results;
  }

}
