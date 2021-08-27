import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OcrModule } from './ocr/ocr.module';
import { DocumentModule } from './document/document.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import * as fsStore from 'cache-manager-fs-hash';
import { RequestsModule } from './requests/requests.module';
import { ActivityModule } from './activity/activity.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: fsStore,
      options: {
        path: 'diskcache', //path for cached files
        ttl: 60 * 60, //time to life in seconds
        subdirs: true, //create subdirectories to reduce the
        //files in a single dir (default: false)
        zip: true, //zip files to save diskspace (default: false)
      },
    }),
    RolesModule,
    UserModule,
    AuthModule,
    OcrModule,
    TypeOrmModule.forRoot({ synchronize: true }),
    DocumentModule,
    CommentModule,
    RequestsModule,
    ActivityModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
