import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
import { DocumentController } from './document.controller';
import { UserModule } from '../users/users.module';
import { ActivityModule } from 'src/activity/activity.module';
import { DocumentSubscriber } from './document.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UserModule, ActivityModule],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentSubscriber],
  exports: [DocumentService],
})
export class DocumentModule {}
