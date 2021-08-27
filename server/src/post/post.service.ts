import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { PostInterface } from './interface/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  createOne(post: PostDto) {
    return this.postRepository.save(post);
  }

  getUserPosts(userId: number) {
    return this.postRepository.find({
      where: { id: userId },
      order: { created_at: 'DESC' },
    });
  }

  getAll() {
    return this.postRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  updateOne(id: number, post: PostDto) {
    return this.postRepository.update(post, { id });
  }

  deleteOne(id: number) {
    return this.postRepository.delete({ id });
  }
}
