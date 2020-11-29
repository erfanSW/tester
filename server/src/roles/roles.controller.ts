import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';

@Controller('roles')
// @UseFilters(new HttpExceptionFilter())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAll() {
    return await this.rolesService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() role: RoleDto) {
    return await this.rolesService.createOne(role);
  }

  @Put()
  async update(@Body() role: RoleDto) {
    return await this.rolesService.updateOne(role);
  }
}
