import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentInterface } from './interface/document.interface';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  createOne(document: DocumentInterface) {
    return this.documentRepository.save(document);
  }

  findOne(id: number) {
    return this.documentRepository.findOne(id);
  }

  getAll() {
    return this.documentRepository
      .createQueryBuilder('document')
      .select([
        'document.id',
        'document.name',
        'document.data',
        'new_pa.id',
        'new_pa.username',
        'new_pa.phone',
        'new_role.name',
        'new_role.id'
      ])
      .leftJoin('document.patient', 'new_pa')
      .leftJoin('new_pa.role', 'new_role')
      .getMany();
  }

  updateOne(role: DocumentInterface) {
    const { id, ...rest } = role;
    // return this.documentRepository.update(id, { ...rest });
  }
}
