import { BaseModel } from '../../../core/base.model';
import { prop } from '@typegoose/typegoose';
import { RoleEnum } from '../interfaces/role.enum';
import { Exclude } from 'class-transformer';

export class Users extends BaseModel {
  @prop()
  username?: string;

  @Exclude()
  @prop({ required: true })
  password: string;

  @prop({ enum: RoleEnum, required: true })
  role: RoleEnum;
}
