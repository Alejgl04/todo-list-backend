import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { User } from './entities/user.entity';

import { CreateAuthDto, LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    try {
      const { email } = createAuthDto;
      const userDB = new this.userModel({ email });
      const user = await userDB.save();

      return {
        user,
        token: this.generateJWT({ id: user.id }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const { email } = loginAuthDto;
    const user = await this.findOne(email);

    return {
      user,
      token: this.generateJWT({ id: user.id }),
    };
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  generateJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `${error.keyValue['email']} already exists!`,
      );
    }
    throw new InternalServerErrorException('Something went wrong, check admin');
  }
}
