import { Controller, Post, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary.service';

import { FileValidationPipe } from './pipes/file-type.pipe';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File) {
    return this.cloudinaryService.upload(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudinaryService.remove(id);
  }
}
