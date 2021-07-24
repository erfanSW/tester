import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserInterface } from './interface/users.interface';
import { RoleType } from 'src/roles/interface/roles.interface';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private userRepository: Repository<Users>;

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(credential): Promise<Users> {
    return this.userRepository.findOne(credential);
  }

  async findAllDoctors(): Promise<Users[]> {
    return await this.userRepository.find({
      where: { role: { id: RoleType.Doctor } },
    });
  }

  async createOne(user: UserInterface): Promise<Users> {
    return await this.userRepository.save(user);
  }

  updateOne(user: UserInterface) {
    const { id, ...rest } = user;
    return this.userRepository.update(id, { ...rest });
  }
}
