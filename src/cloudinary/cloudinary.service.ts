import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async upload(file: Express.Multer.File) {
    cloudinary.config({
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      cloud_name: process.env.CLOUD_NAME,
    });

    try {
      const { buffer, mimetype } = file;
      const imageBase64 = `data:${ mimetype };base64,${ Buffer.from(buffer).toString('base64') }`;
      const { secure_url } = await cloudinary.uploader.upload(imageBase64);
      return { ok: true, secure_url };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    cloudinary.config({
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      cloud_name: process.env.CLOUD_NAME,
    });

    try {
      await cloudinary.uploader.destroy(id);
      return { ok: true }
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError = (error: any) => {
    if (error.code >= 400 && error.code < 500) throw new BadRequestException(error.message);

    throw new InternalServerErrorException('Algo salió mal, inténtelo de nuevo más tarde.');
  }
}
