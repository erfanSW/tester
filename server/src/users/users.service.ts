import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createOne(): Promise<User> {
    return this.userRepository.create();
  }
}
