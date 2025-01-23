import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './file-upload.controller';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  providers: [FileUploadService],
  exports: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
