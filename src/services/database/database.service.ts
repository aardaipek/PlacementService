import { Injectable } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { UniversityService } from '../university/university.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly requestService: RequestService, private readonly universityService: UniversityService) {}
  public async getAllStudent() {
    const students = await this.requestService.getStudents();
    return students.map((student) => {
      return {
        name: student.name.first,
        lastname: student.name.last,
        score: 0,
      };
    });
  }

  public async getAllUniversities() {
    return await this.universityService.getUniversities();
  }
}
