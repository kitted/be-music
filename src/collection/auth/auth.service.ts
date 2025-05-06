import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ResetToken } from './schemas/resetToken.schema';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { jwtConstants } from './interfaces/auth.const';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ResetToken)
    private readonly module: ReturnModelType<typeof ResetToken>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async getTokenFromUser(username: string) {
    const user: any = await this.usersService.findUserForLogin(username);
    if (!user)
      throw new HttpException(
        'Tài khoản và mật khẩu không đúng!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.getToken(user);
  }

  async getToken(user: any) {
    const token = await this.module.findOne({ userId: user.id });
    if (token) {
      await this.module.findByIdAndDelete(token._id);
    }

    const payload: JwtPayload = {
      id: user._id,
      role: user.role,
    };

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret_refresh,
      expiresIn: jwtConstants.expiresInRefresh,
    });

    const newToken = randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(newToken, 10);

    await new this.module({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      role: user.role,
    };
  }

  async credentialByPassword(username: string, password: string) {
    const user = await this.usersService.findUserForLogin(username);

    if (!user) {
      throw new HttpException(
        'Tài khoản và mật khẩu không đúng!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPassword: any = user.password;
    const match = await bcrypt.compare(password, userPassword);

    if (!match) {
      throw new HttpException(
        'Tài khoản và mật khẩu không đúng!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
