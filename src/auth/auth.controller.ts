import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    console.log(req.body);
    return req.user;
  }
}
