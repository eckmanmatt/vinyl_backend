import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { RecordSchema } from './record.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Record', schema: RecordSchema}])
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
})

export class RecordsModule {}
