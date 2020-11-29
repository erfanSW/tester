import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findOne(user: UserDto) {
    return this.userService.findOne(user);
  }

  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.createOne(user);
  }
}
