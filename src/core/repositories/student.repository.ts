import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from '../dtos/create.student.dto';
import { UpdateStudentDto } from '../dtos/update.student.dto';
import { IStudent } from '../interfaces/student.interface';
import { Model } from 'mongoose';
import { RequestService } from '../../services/request/request.service';
import { StudentService } from '../../services/student/student.service';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel('student') private studentModel: Model<IStudent>,
    private readonly requestService: RequestService,
    private readonly studentService: StudentService,
  ) {}

  public async createStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  public async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  public async getAllStudents(): Promise<IStudent[]> {
    const studentData = await this.studentModel.find();
    if (!studentData || studentData.length == 0) {
      const studentsData = await this.requestService.getStudents();
      try {
        await Promise.all(
          studentsData.map(async (student) => {
            const studentObject: CreateStudentDto = {
              name: student.name.first,
              lastname: student.name.last,
              score: 0,
            };
            await this.createStudent(studentObject);
          }),
        );
        return await this.studentModel.find();
      } catch (err) {
        return err;
      }
    }
    return studentData;
  }

  public async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  public async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deletedStudent;
  }
}
