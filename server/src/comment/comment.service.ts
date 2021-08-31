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

  findByDocument(id: number) {
    return this.commentRepository.find({
      where: { document: id },
      order: { created_at: 'DESC' },
    });
  }

  getAll() {
    return this.commentRepository.find();
  }

  updateOne(role: CommentInterface) {
    const { id, ...rest } = role;
    return this.commentRepository.update(id, { ...rest });
  }

  updateText(id: number, text: string) {
    return this.commentRepository.update(id, { text });
  }

  deleteOne(id: number) {
    return this.commentRepository.delete({ id });
  }
}
