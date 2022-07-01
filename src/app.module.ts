import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [RecordsModule, MongooseModule.forRoot('mongodb+srv://meckman:strangerthings@cluster0.w6ien.mongodb.net/nestjs-vinyl?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
