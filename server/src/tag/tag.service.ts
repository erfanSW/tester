import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagInterface } from './interface/tag.interface';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  createOne(tag: TagDto) {
    return this.tagRepository.save(tag);
  }

  findOne(id: number) {
    return this.tagRepository.findOne(id);
  }

  getAll() {
    return this.tagRepository.find();
  }

  updateOne(tag: TagInterface) {
    const { id, ...rest } = tag;
    return this.tagRepository.update(id, { ...rest });
  }
}
