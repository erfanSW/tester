import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserInterface } from './interface/users.interface';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private userRepository: Repository<Users>;

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(username): Promise<Users> {
    return this.userRepository.findOne({
      username,
    });
  }

  async createOne(user: UserInterface): Promise<Users> {
    return await this.userRepository.save(user);
  }
}
