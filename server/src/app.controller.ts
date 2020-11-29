import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UserDto } from './users/dto/users.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('auth/signup')
  async signup(@Body() user: UserDto) {
    const exisiting_user = await this.userService.findOne(user.username);
    if (!exisiting_user) {
      const new_user = await this.userService.createOne(user);
    } else {
      throw new HttpException('نام کاربری تکراری است', HttpStatus.BAD_REQUEST);
    }
  }
}
