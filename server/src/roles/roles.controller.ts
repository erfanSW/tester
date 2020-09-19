import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Catch,
  UseFilters,
  HttpException,
  ParseIntPipe,
  Param,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';
import { HttpExceptionFilter } from '../exeptions/filters/http-exception.filter';
import { get } from 'http';

@Controller('roles')
// @UseFilters(new HttpExceptionFilter())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() role: RoleDto) {
    return await this.rolesService.createOne(role);
  }
}
