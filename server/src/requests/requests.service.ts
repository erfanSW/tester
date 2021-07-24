import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { RequestInterface } from './interface/requests.interface';
import { Request } from './requests.entity';
import { Document } from '../document/document.entity';

// @ts-ignore

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  findById(id: number) {
    return this.requestRepository.find({
      where: [{ doctor: id }, { applicant: id }],
    });
  }

  createOne(request: RequestInterface) {
    return this.requestRepository.save(request);
  }

  async updateOne(id, state, userId) {
    const request = await this.requestRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });

    if (request)
      return getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.query(
          `update "request" set state=${state} where id=${id};`,
        );
        const _userId = state === 2 ? userId : 'NULL';
        const result = await transactionalEntityManager.query(
          `update document set "doctorId"=${_userId} where id=${request.document};`,
        );
        return result[1];
      });
  }
}
