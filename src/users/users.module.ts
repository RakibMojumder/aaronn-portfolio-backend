import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot(),
    FileUploadModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
