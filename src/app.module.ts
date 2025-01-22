import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsService } from './projects/projects.service';
import { ProjectsController } from './projects/projects.controller';
import { FileUploadController } from './file-upload/file-upload.controller';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Setup Mongoose connection using ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    FileUploadModule,
  ],
  controllers: [AppController, ProjectsController, FileUploadController],
  providers: [AppService, ProjectsService, FileUploadService],
})
export class AppModule {}
