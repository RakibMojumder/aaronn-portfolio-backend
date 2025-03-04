import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.schema.zod';
import { LoginDto } from './user.schema.zod';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResponse } from './dto/response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
    // private readonly fileUploadService: FileUploadService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<Partial<User>>> {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists',
          error: 'Email already registered',
        };
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      // Create new user
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      const savedUser = await user.save();

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser.toObject();

      return {
        success: true,
        message: 'User created successfully',
        data: userWithoutPassword,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating user',
        error: error.message,
      };
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<ApiResponse<{ token: string; user: Partial<User> }>> {
    try {
      // Find user
      const user = await this.userModel.findOne({ email: loginDto.email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        this.configService.get<string>('JWT_SECRET'),
        { expiresIn: '24h' },
      );

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user.toObject();

      return {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: userWithoutPassword,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
        error: error.message,
      };
    }
  }

  // async uploadProfilePicture(userId: string, file: Express.Multer.File) {
  //   try {
  //     const user = await this.userModel.findById(userId);
  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     // If user already has a profile picture, delete the old one
  //     if (user.profilePicture?.publicId) {
  //       await this.fileUploadService.deleteFile(user.profilePicture.publicId);
  //     }

  //     // Upload new picture
  //     const uploadResult = await this.fileUploadService.uploadFile(
  //       file,
  //       'profile-pictures',
  //     );

  //     // Update user with new profile picture
  //     const updatedUser = await this.userModel.findByIdAndUpdate(
  //       userId,
  //       {
  //         profilePicture: {
  //           url: uploadResult.url,
  //           publicId: uploadResult.public_id,
  //         },
  //       },
  //       { new: true },
  //     );

  //     return {
  //       success: true,
  //       message: 'Profile picture uploaded successfully',
  //       data: {
  //         profilePicture: updatedUser.profilePicture,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Failed to upload profile picture',
  //       error: error.message,
  //     };
  //   }
  // }
}
