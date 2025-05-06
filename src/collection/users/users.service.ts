import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Users } from './schemas/users.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly module: ReturnModelType<typeof Users>,
  ) {}

  async getTest() {
    return 'abc';
  }

  async create(payload: any) {
    return await this.module.create(payload);
  }
}
