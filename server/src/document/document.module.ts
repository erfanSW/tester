import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
import { DocumentController } from './document.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UserModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
