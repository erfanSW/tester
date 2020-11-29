import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAll() {
    return await this.documentService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.documentService.findOne(id);
    if (!result) {
      throw new HttpException('یافت نشد !', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  async create(@Body() document: DocumentDto) {
    return await this.documentService.createOne(document);
  }

  @Put()
  async update(@Body() document: DocumentDto) {
    return await this.documentService.updateOne(document);
  }
}
