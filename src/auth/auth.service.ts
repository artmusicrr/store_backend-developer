import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    email_user: string,
  ): Promise<any> {
    try {
      const user = await this.usersService.getUserByUsername(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        const { id_user, username, email_user } = user;
        return { id_user, username, email_user };
      }
      if (!user) {
        throw new BadRequestException('Invalid Credentials');
      }
    } catch (error) {
      throw new BadRequestException('Invalid Credentials');
    }

    return null;
  }

  async login(user: any) {
    try {
      const payload = {
        username: user.username,
        sub: user.id_user,
        email_user: user.email_user,
      };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new BadRequestException('Invalid Credentials');
    }
  }
}
