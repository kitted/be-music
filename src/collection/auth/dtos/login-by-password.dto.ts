import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginByPasswordDto {
  @ApiProperty({ required: true, type: String, example: 'abc' })
  @IsString()
  username: string;

  @ApiProperty({ required: true, type: String, example: '123456' })
  @IsString()
  @Length(6, 12)
  password: string;
}
