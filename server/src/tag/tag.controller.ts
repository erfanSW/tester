import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { TagInterface } from './interface/tag.interface';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAll() {
    return await this.tagService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.findOne(id);
  }

  @Post()
  async create(@Body() tag: TagDto) {
    return await this.tagService.createOne(tag);
  }

  @Put()
  async update(@Body() tag: TagInterface) {
    return await this.tagService.updateOne(tag);
  }
}
