import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      emailField: 'email_user',
    });
  }
  async validate(
    username: string,
    password: string,
    email_user: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
      email_user,
    );
    if (!user) {
      throw new UnauthorizedException(username + ' não localizado.');
    }
    return user;
  }
}
