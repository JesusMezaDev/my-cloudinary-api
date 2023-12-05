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