import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
  Delete,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { RoleType } from '../roles/interface/roles.interface';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    const userId = req.user.userId;
    return await this.documentService.getByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = await this.usersService.findOne({ id: req.user.userId });
    const result = await this.documentService.findOne(id, user.id);
    if (!result) {
      throw new HttpException('یافت نشد !', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() document: DocumentDto, @Request() req) {
    const user = await this.usersService.findOne({ id: req.user.userId });
    if (user.role.id == RoleType.Patient) {
      document.patient = user.id;
    }
    if (user.role.id == RoleType.Doctor) {
      document.doctor = user.id;
    }

    return await this.documentService.createOne(document);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/:tagid')
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Param('tagid', ParseIntPipe) tagId: number,
  ) {
    return await this.documentService.updateTag(id, tagId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    try {
      const requested_document = await this.documentService.getByUserAndDoc(
        req.user.userId,
        id,
      );
      if (requested_document) {
        const result = await this.documentService.deleteOne(id);
        return 'با موفقیت انجام شد';
      } else {
        throw new HttpException('یافت نشد', 404);
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
