import { Injectable } from '@nestjs/common';
import { UserService } from '../otherUser/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserBy('username', username);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async jwt(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
