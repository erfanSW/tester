import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { UserInterface } from './interface/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/doctors/all')
  findDoctors() {
    return this.userService.findAllDoctors();
  }

  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.createOne(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() user: UserInterface, @Request() req) {
    if (user.id !== req.user.userId) {
      throw new HttpException(
        'شما به این کار دسترسی ندارید',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.userService.updateOne(user);
  }
}
