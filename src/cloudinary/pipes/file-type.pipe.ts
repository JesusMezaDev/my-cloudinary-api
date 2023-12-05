// import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
// import { fileTypeFromBuffer } from 'file-type';

// @Injectable()
// export class FileTypeImagesValidationPipe implements PipeTransform {
//   async transform(value: Express.Multer.File) {
//     const { mime } = await fileTypeFromBuffer(value.buffer)
//     const MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

//     if (!MIME_TYPES.includes(mime)) {
//       throw new BadRequestException('The image should be either jpeg, png, or webp.')
//     }

//     return value
//   }
// }

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { validateFileFormat } from '../helpers/file';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('No se ingresó un archivo')

    const { originalname, size } = value;

    if (!validateFileFormat(originalname, ['jpg', 'jpeg', 'png'])) throw new BadRequestException('El formato de la imagen no es válido')

    if (Number((size / (1024 * 1024)).toFixed(2)) > 2) throw new BadRequestException('El archivo es demasiado grande')

    return value;
  }
}