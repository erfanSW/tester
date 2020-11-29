import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OcrModule } from './ocr/ocr.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    RolesModule,
    UserModule,
    AuthModule,
    OcrModule,
    TypeOrmModule.forRoot(),
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
