import { Injectable } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { DatabaseService } from '../../core/repositories/database.service';
import { CreateUniversityDto } from '../../core/dtos/create.university.dto';

@Injectable()
export class UniversityService {
  constructor(
    private readonly requestService: RequestService,
    //private readonly database: DatabaseService,
  ) {}

  public async getUniversities(country = 'turkey') {
    const universities = await this.requestService.getUniversities(country);

    const orderedUniversities = universities
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((university, index) => index % 2 === 0)
      .map((university) => ({ name: university.name, quota: 5, students: [] }));

    return orderedUniversities;
  }

  // public async insertUniversity() {
  //   const universityData = await this.getUniversities();
  //   try {
  //     await Promise.all(
  //       universityData.map(async(university) => {
  //         await this.database.insertUniversity(university);
  //       }),
  //     );
  //     return true;
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
