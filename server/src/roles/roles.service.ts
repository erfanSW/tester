import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { RoleInterface } from './interface/roles.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  createOne(role: RoleInterface) {
    return this.rolesRepository.save(role);
  }

  findOne(id: number) {
    return this.rolesRepository.findOne(id);
  }

  getAll() {
    return this.rolesRepository.find();
  }

  updateOne(role: RoleInterface) {
    const { id, ...rest } = role;
    return this.rolesRepository.update(id, { ...rest });
  }
}
