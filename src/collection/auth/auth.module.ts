import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { Jwt2faStrategy } from './strategy/jwt2fa.strategy';
import { TypegooseModule } from 'nestjs-typegoose';
import { ResetToken } from './schemas/resetToken.schema';
import { jwtConstants } from './interfaces/auth.const';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    TypegooseModule.forFeature([ResetToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Jwt2faStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
