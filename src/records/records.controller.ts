import { Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common'

import { RecordsService } from './records.service'

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService){

  }

  @Post()
  addRecord(
    @Body('title') recTitle: string,
    @Body('artist') recArtist: string,
    @Body('year') recYear: number,
    @Body('cover') recCover: string
  ): any {
    const generatedId = this.recordsService.insertRecord(
      recTitle,
      recArtist,
      recYear,
      recCover,
    );
    return { id: generatedId }
  }

  @Get()
  getAllRecords(){
    return this.recordsService.getRecords();
  }

  @Get(':id')
  getRecord(@Param('id') recId: string){
    return this.recordsService.getSingleRecord(recId)
  }

  @Patch(':id')
  updateRecord(
    @Param('id') recId: string,
    @Body('title') recTitle:string,
    @Body('artist') recArtist: string,
    @Body('year') recYear: number,
    @Body('cover') recCover: string
  ){
    this.recordsService.updateRecord(recId, recTitle, recArtist, recYear, recCover);
      return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') recId: string,){
    this.recordsService.deleteRecord(recId)
    return null;
  }


}
