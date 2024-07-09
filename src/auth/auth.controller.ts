import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { tokenUser } from './interfaces/token-user';
import { User } from './entities/user.entity';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto);
  }

  @Post('check-token')
  token(@Request() req: Request): tokenUser {
    const user = req['user'] as User;
    console.log(user);
    return {
      user,
      token: this.authService.generateJWT({
        id: user._id,
      }),
    };
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.authService.findOne(email);
  }
}
