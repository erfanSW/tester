import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll() {
    return await this.commentService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.commentService.findOne(id);
    if (!result) {
      throw new HttpException('یافت نشد !', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  async create(@Body() document: CommentDto) {
    return await this.commentService.createOne(document);
  }

  @Put()
  async update(@Body() document: CommentDto) {
    return await this.commentService.updateOne(document);
  }
}
