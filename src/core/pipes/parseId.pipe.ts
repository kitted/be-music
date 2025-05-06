import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata?: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Id invalid format');
    }
    return value;
  }
}
