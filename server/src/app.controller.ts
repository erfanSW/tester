import {
  Body,
  Header,
  Controller,
  Post,
  Req,
  HttpException,
  HttpStatus,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UserDto } from './users/dto/users.dto';
import { totp } from 'otplib';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('auth/register')
  async register(@Body() user: UserDto) {
    const requested_user = await this.userService.findOne({
      phone: user.phone,
    });
    if (!requested_user) {
      throw new HttpException('کاربر یافت نشد', HttpStatus.NOT_FOUND);
    } else {
      const token: String = totp.generate(process.env.OTP_KEY);

      await this.cacheManager.set(user.phone, { token });

      this.authService.sendOtp(user.phone, token);

      return 'کد تایید برای شماره تلفن شما ارسال شد';
    }
  }

  @Post('auth/signup')
  async signup(@Body() user: UserDto) {
    const exisiting_user = await this.userService.findOne({
      phone: user.phone,
    });
    if (!exisiting_user) {
      const token: String = totp.generate(process.env.OTP_KEY);

      await this.cacheManager.set(user.phone, { ...user, token });

      this.authService.sendOtp(user.phone, token);

      throw new HttpException('ok', HttpStatus.OK);
    } else {
      throw new HttpException(' کاربر از قبل ثبت نام کرده است ', 409);
    }
  }

  @Post('auth/validate_otp')
  @Header('Type', 'none')
  async validate_signup(@Body() user: UserDto, @Req() req) {
    const existed_user: any = await this.cacheManager.get(user.phone);
    if (!existed_user) {
      throw new HttpException(
        'کد ورودی ارسال نشده است',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isValid = existed_user.token == user.password;
    if (isValid) {
      if (req.headers.type == 'signup') {
        const { token, ...new_user } = existed_user;
        const exisiting_user = await this.userService.findOne(new_user);
        if (!exisiting_user) {
          const result = await this.userService.createOne(new_user);
        console.log(10);
          await this.cacheManager.del(user.phone);
          return this.authService.login(result);
        } else {
          throw new HttpException(' کاربر از قبل ثبت نام کرده است ', 409);
        }
      } else if (req.headers.type == 'login') {
        const exisiting_user = await this.userService.findOne({
          phone: user.phone,
        });
        await this.cacheManager.del(user.phone);
        return this.authService.login(exisiting_user);
      }
    } else {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }
}
