import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './requests.entity';
import { UserModule } from 'src/users/users.module';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), UserModule, DocumentModule],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
