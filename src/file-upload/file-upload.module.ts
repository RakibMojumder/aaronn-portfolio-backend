import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './file-upload.controller';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  ],
  providers: [FileUploadService],
  exports: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
