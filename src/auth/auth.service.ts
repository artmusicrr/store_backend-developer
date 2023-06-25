import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    console.log('>>>', user);
    if (user && user.password === password) {
      const { id_user, username, email } = user;
      return { id_user, username, email };
    }
    return null;
  }
}
