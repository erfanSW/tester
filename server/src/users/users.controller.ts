import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../guards/RoleGuard';
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

  @Put()
  async update(@Body() user: UserInterface) {
    return await this.userService.updateOne(user);
  }
}
