import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUniversityDto } from '../dtos/create.university.dto';
import { UpdateUniversityDto } from '../dtos/update.university.dto';
import { IUniversity } from '../interfaces/university.interface';
import { Model } from 'mongoose';
import { RequestService } from '../../services/request/request.service';
import { UniversityService } from '../../services/university/university.service';

@Injectable()
export class UniversityRepository {
  constructor(
    @InjectModel('university') private universityModel: Model<IUniversity>,
    private readonly requestService: RequestService,
    private readonly universityService: UniversityService,
  ) {}

  public async insertUniversity(
    createUniversityDto: CreateUniversityDto,
  ): Promise<IUniversity> {
    const newUniversity = await new this.universityModel(createUniversityDto);
    return newUniversity.save();
  }

  public async updateUniversity(
    universityId: string,
    updateUniversityDto: UpdateUniversityDto,
  ): Promise<IUniversity> {
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
    const existingUniversity = await this.universityModel
      .findById(universityId)
      .exec();
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
    const deletedUniversity = await this.universityModel.findByIdAndDelete(
      universityId,
    );
    if (!deletedUniversity) {
      throw new NotFoundException(`University #${universityId} not found`);
    }
    return deletedUniversity;
  }
}
