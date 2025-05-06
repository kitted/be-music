import { PublicController } from '../decorators/swagger';
import { Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/collection/users/dtos/create-user.dto';
import { UsersService } from 'src/collection/users/users.service';

@PublicController(['users'])
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'create new user' })
  @Post('')
  async create(@Body() payload: CreateUserDto) {
    return await this.service.create(payload);
  }
}
