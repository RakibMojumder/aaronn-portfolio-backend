import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { ZodValidationPipe } from './zod.validation.pipe';
import {
  CreateUserDto,
  CreateUserSchema,
  LoginDto,
  LoginSchema,
} from './user.schema.zod';
import { ApiResponse } from './dto/response.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ): Promise<ApiResponse<Partial<User>>> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto,
  ): Promise<ApiResponse<{ token: string; user: Partial<User> }>> {
    return this.userService.login(loginDto);
  }

  // @Post(':id/profile-picture')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadProfilePicture(
  //   @Param('id') userId: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.userService.uploadProfilePicture(userId, file);
  // }
}
