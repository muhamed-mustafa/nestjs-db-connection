import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValidMongoId = /^[a-zA-Z0-9]{24}$/.test(value);

    if (!isValidMongoId) {
      throw new BadRequestException(`Invalid Mongo ID: ${value}`);
    }

    return value;
  }
}
