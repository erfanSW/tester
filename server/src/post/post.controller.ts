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
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostInterface } from './interface/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/myposts')
  async getUserPosts(@Request() req) {
    const userId = req.user.userId;
    return this.postService.getUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() post: PostDto) {
    const userId = req.user.userId;
    post.user = userId;
    return this.postService.createOne(post);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Request() req,
    @Body() post: PostDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user.userId;
    if (userId !== post.user) {
      throw new HttpException(
        'شما به این کار دسترسی ندارید',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.postService.updateOne(id, post);
  }
}
