import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { RequestInterface, RequestState } from './interface/requests.interface';
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
      order: { updated_at: 'DESC' },
    });
  }

  findByUserIdAndDocId(id: number, docId: number) {
    return this.requestRepository.find({
      where: [
        { doctor: id, document: docId },
        { applicant: id, document: docId },
      ],
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
        if (state === RequestState.ACCEPTED)
          await transactionalEntityManager.query(
            `update "request" set state=${RequestState.ACCEPTED_BY_OTHERS} where "documentId"=${request.document} AND state=${RequestState.UNKNOWN}`,
          );
        return result[1];
      });
  }
}
