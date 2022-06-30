import { Injectable, NotFoundException } from '@nestjs/common';

import { Record } from './record.model'

@Injectable()
export class RecordsService {
  private records: Record[] = [];

  insertRecord(title: string, artist: string, year:number, cover:string) {
    const recId = Math.random().toString();
    const newRecord = new Record(recId, title, artist, year, cover);
    this.records.push(newRecord);
    return recId;
  }

  getRecords(){
    return [...this.records];
  }

  getSingleRecord(recordId: string){
    const record = this.findRecord(recordId)[0]
    return {...record};
  }

  updateRecord(recordId:string, title: string, artist: string, year: number, cover: string){
    const [record,index] = this.findRecord(recordId)
    const updatedRecord = {...record};
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
    this.records[index] = updatedRecord;
  }

  deleteRecord(recId: string){
    const index = this.findRecord(recId)[1];
    this.records.splice(index,1);
  }

  private findRecord(id:string):[Record, number]{
    const recordIndex = this.records.findIndex(rec => rec.id === id);
    const record = this.records[recordIndex];
    if (!record){
      throw new NotFoundException('Record Not Found.');
    }
    return [record,recordIndex];
  }


}
