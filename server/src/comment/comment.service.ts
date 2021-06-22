import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentInterface } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  createOne(comment: CommentInterface) {
    return this.commentRepository.save(comment);
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  getAll() {
    return this.commentRepository.find()
  }

  updateOne(role: CommentInterface) {
    const { id, ...rest } = role;
    return this.commentRepository.update(id, { ...rest });
  }
}
