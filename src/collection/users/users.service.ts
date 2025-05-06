import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Users } from './schemas/users.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ID } from 'src/core/interfaces/id.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async getTest() {
    return 'abc';
  }

  async getByLogin(username: string) {
    return await this.userModel.findOne({ username });
  }

  async findById(id: ID | string) {
    return await this.userModel.findById(id).select('-password');
  }

  async findUserForLogin(username: string) {
    return await this.getByLogin(username);
  }

  async create(payload: any) {
    console.log(payload);
    const password = await bcrypt.hash(payload.password, 10);
    return await this.userModel.create({ ...payload, password });
  }
}
