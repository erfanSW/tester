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
  UseGuards,
  Delete,
  Patch,
  Request
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from 'src/activity/activity.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly activityService: ActivityService,
  ) {}

  @Get()
  async getAll() {
    return await this.commentService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) docId: number) {
    const result = await this.commentService.findByDocument(docId);
    if (!result) {
      throw new HttpException('یافت نشد !', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() comment: CommentDto, @Request() req) {
    comment.author = req.user.userId;
    return await this.commentService.createOne(comment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateText(
    @Param('id', ParseIntPipe) id: number,
    @Body() text: string,
  ) {
    return await this.commentService.updateText(id, text);
  }

  @Put()
  async update(@Body() document: CommentDto) {
    return await this.commentService.updateOne(document);
  }
}
