import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/createStudentDTO/create.student.dto';
import { UpdateStudentDto } from './dto/updateStudentDTO/update.student.dto';
import { CreateUniversityDto } from './dto/createUniversityDTO/create.university.dto';
import { UpdateUniversityDto } from './dto/updateUniversityDTO/update.university.dto';
import { IStudent } from './interface/student/student.interface';
import { IUniversity } from './interface/university/university/university.interface';
import { Model } from 'mongoose';
import { RequestService } from '../request/request.service';
import { UniversityService } from '../university/university.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('student') private studentModel: Model<IStudent>,
    @InjectModel('university') private universityModel: Model<IUniversity>,
    private readonly requestService: RequestService,
    private readonly universityService: UniversityService,
    private readonly studentService: StudentService,
  ) {}

  public async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  public async updateStudent(studentId: string,updateStudentDto: UpdateStudentDto): Promise<IStudent> {
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

  public async insertUniversity(createUniversityDto: CreateUniversityDto,): Promise<IUniversity> {
    const newUniversity = await new this.universityModel(createUniversityDto);
    return newUniversity.save();
  }

  public async updateUniversity(universityId: string,updateUniversityDto: UpdateUniversityDto,): Promise<IUniversity> {
    const existingUniversity = await this.universityModel.findByIdAndUpdate(
      universityId,
      updateUniversityDto,
      { new: true },
    );
    if (!existingUniversity) {
      throw new NotFoundException(`University #${universityId} not found`);
    }
    return existingUniversity;
  }

  public async getUniversity(universityId: string): Promise<IUniversity> {
    const existingUniversity = await this.universityModel.findById(universityId).exec();
    if (!existingUniversity) {
      throw new NotFoundException(`University #${universityId} not found`);
    }
    return existingUniversity;
  }

  public async getAllUniversity(): Promise<IUniversity[]> {
    const universityData = await this.universityModel.find().sort('name');
    if (!universityData || universityData.length == 0) {
      throw new NotFoundException('University data not found!');
    }
    return universityData;
  }

  public async deleteUniversity(universityId: string): Promise<IUniversity> {
    const deletedUniversity = await this.universityModel.findByIdAndDelete(universityId);
    if (!deletedUniversity) {
      throw new NotFoundException(`University #${universityId} not found`);
    }
    return deletedUniversity;
  }
}
