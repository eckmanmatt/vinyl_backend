import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Record } from './record.model';

@Injectable()
export class RecordsService {

  constructor(@InjectModel('Record') private readonly recordModel: Model<Record>) {}

  async insertRecord(title: string, artist: string, year:number, cover:string) {
    const recId = Math.random().toString();
    const newRecord = new this.recordModel({
      title:title,
      artist:artist,
      year:year,
      cover:cover
    });
    const result = await newRecord.save()
    return result.id as string;
  }

  async getRecords(){
    const records = await this.recordModel.find().exec();
    return records as Record[];
  }

  async getSingleRecord(recordId: string){
    const record = await this.findRecord(recordId)
    return {
      id:record.id,
      title: record.title,
      artist: record.artist,
      year: record.year,
      cover: record.cover,
    };
  }

  async updateRecord(recordId:string, title: string, artist: string, year: number, cover: string){
    const updatedRecord = await this.findRecord(recordId);
    if(title){
      updatedRecord.title = title
    }
    if(artist){
      updatedRecord.artist = artist
    }
    if(year){
      updatedRecord.year = year
    }
    if(cover){
      updatedRecord.cover = cover
    }
    updatedRecord.save();
  }

  async deleteRecord(recId: string){
    await this.recordModel.deleteOne({_id:recId}).exec();
  }

  private async findRecord(id:string): Promise<Record> {
    let record
    try{
      record = await this.recordModel.findById(id);
    }catch(error){
      throw new NotFoundException('Record Not Found.');
    }
    if (!record){
      throw new NotFoundException('Record Not Found.');
    }
    return record;
  }
}
