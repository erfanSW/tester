import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { totp } from 'otplib';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findByUsername(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  sendOtp(receptor: String, token: String) {
    const Kavenegar = require('kavenegar');

    const api = Kavenegar.KavenegarApi({
      apikey: process.env.KAVENEGAR_API_KEY,
    });

    api.VerifyLookup(
      {
        receptor: receptor,
        token: token,
        template: 'verify',
      },
      function(response, status) {
        console.log(response);
        console.log(status);
      },
    );
  }
}
