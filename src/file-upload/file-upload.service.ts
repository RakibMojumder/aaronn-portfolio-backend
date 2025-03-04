import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/users/dto/response.dto';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads',
  ): Promise<ApiResponse<{ url: string; public_id: string }>> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          uploadStream.end(file.buffer);
        },
      );

      return {
        success: true,
        message: 'File upload successful',
        data: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to upload file',
        error: error.message,
      };
    }
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
