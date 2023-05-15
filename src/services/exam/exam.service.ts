import { Injectable } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExamService {
  constructor(
    private readonly requestService: RequestService,
    private readonly db: DatabaseService,
  ) {}

  public async takeExam(date) {
    const titles = await this.requestService.getTitles(date);
    // Öğrencileri db den çek. Proje ilk açıldığında öğrencileri çekip db ye kayıt et
    const students = await this.db.getAllStudent();

    const universities = await this.db.getAllUniversities();

    students.map((student) => {
      const name = student.name + '_' + student.lastname;

      titles.map((title) => {
        const matchingChars = this.countMatchingChars(name, title.article);
        student.score += matchingChars;
      });
    });

    students.sort((a, b) => b.score - a.score);

    // Yerleştirmeyi yap
    students.map((student) => {
      const suitableUniversity = universities.find(
        (university) => university.students.length < university.quota,
      );
      if (suitableUniversity) {
        suitableUniversity.students.push(student);
      }
    });

    return universities;
  }

  private countMatchingChars(name, title) {
    const namee = name.toLowerCase().split('');
    const titlee = title.toLowerCase().split('');
    let count = 0;

    namee.forEach((char) => {
      if (titlee.includes(char)) {
        count++;
        titlee.splice(titlee.indexOf(char), 1);
      }
    });

    return count;
  }
}
