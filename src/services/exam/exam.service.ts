import { Injectable } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { DatabaseService } from '../database/database.service';
import { UpdateUniversityDto } from '../database/dto/updateUniversityDTO/update.university.dto';
import { CreateStudentDto } from '../database/dto/createStudentDTO/create.student.dto';
import { Student } from '../database/schema/schema';
@Injectable()
export class ExamService {
  constructor(
    private readonly requestService: RequestService,
    private readonly database: DatabaseService,
  ) {}

  public async takeExam(date) {
    const titles = await this.requestService.getTitles(date);

    const students = await this.database.getAllStudents();

    const universities = await this.database.getAllUniversity();

    students.map((student) => {
      const name = student.name + '_' + student.lastname;

      titles.map((title) => {
        const matchingChars = this.countMatchingChars(name, title.article);
        student.score += matchingChars;
      });
    });

    students.sort((a, b) => b.score - a.score);

    await Promise.all(students.map(async(student) => {
      const suitableUniversity = universities.find((university) => university.students.length < university.quota);
      if (suitableUniversity) {
        const studentObject: Student = {
          name: student.name,
          lastname: student.lastname,
          score: student.score,
        };
        suitableUniversity.students.push(studentObject);
        await this.database.updateUniversity(suitableUniversity.id,suitableUniversity);
      }
    }));

    const finalResult = await this.database.getAllUniversity();
    return finalResult;
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
