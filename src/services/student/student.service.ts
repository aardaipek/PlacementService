import { Injectable } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { DatabaseService } from '../database/database.service';
import { CreateStudentDto } from '../database/dto/createStudentDTO/create.student.dto';

@Injectable()
export class StudentService {
  constructor(
  ) {}

//   public async insertStudents() {
//     const studentsData = await this.requestService.getStudents();
//     try {
//       await Promise.all(
//         studentsData.map(async (student) => {
//           const studentObject: CreateStudentDto = {
//             name: student.name.first,
//             lastname: student.name.last,
//             score: 0,
//           };
//           await this.database.createStudent(studentObject);
//         }),
//       );
//       return true;
//     } catch (err) {
//       return err;
//     }
//   }
}
