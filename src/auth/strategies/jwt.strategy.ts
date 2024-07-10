import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { JwtPayload } from '../interfaces/jwt.payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    config: ConfigService,
  ) {
    super({
      secretOrKey: config.get('JWT_SEED'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userModel.findById({ _id: id });
    if (!user) throw new UnauthorizedException(`Token not valid`);
    return user;
  }
}
