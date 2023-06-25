import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    console.log('>>>', user);
    if (user && user.password === password) {
      const { id_user, username, email } = user;
      return { id_user, username, email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id_user };
    return { access_token: this.jwtService.sign(payload) };
  }
}
