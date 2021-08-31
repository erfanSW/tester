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

  findOne(id: number, user: number) {
    return this.documentRepository.findOne({
      where: [
        { id, doctor: { id: user } },
        { id, patient: { id: user } },
      ],
    });
  }

  findById(id: number) {
    return this.documentRepository.findOne({
      where: { id },
      loadRelationIds: true
    });
  }

  getAll() {
    return this.documentRepository.find();
  }

  deleteOne(id: number) {
    return this.documentRepository.delete({ id });
  }

  getByUser(user) {
    return this.documentRepository.find({
      where: [{ patient: { id: user } }, { doctor: { id: user } }],
    });
  }

  getByUserAndDoc(user: number, id: number) {
    return this.documentRepository.findOne({
      where: [{ patient: { id: user } }, { id }],
    });
  }

  updateOne(role: DocumentInterface) {
    const { id, ...rest } = role;
    return this.documentRepository.update(id, { ...rest });
  }

  updateTag(id: number, tagId: number) {
    console.log(id, tagId);
    return this.documentRepository.update(id, { tag: tagId });
  }
}
