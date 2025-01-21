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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ): Promise<ApiResponse<Omit<User, 'password'>>> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto,
  ): Promise<ApiResponse<{ token: string; user: Omit<User, 'password'> }>> {
    return this.userService.login(loginDto);
  }
}
