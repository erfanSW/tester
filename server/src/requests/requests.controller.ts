import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DocumentService } from 'src/document/document.service';
import { UsersService } from 'src/users/users.service';
import { RequestDto } from './dto/request.dto';
import { RequestInterface } from './interface/requests.interface';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
    private readonly documentService: DocumentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Req() req) {
    return await this.requestsService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async CreateOne(@Req() req, @Body() request: RequestDto) {
    const userId = req.user.userId;
    const user = await this.usersService.findOne({ id: userId });
    const new_request: RequestInterface = {
      text: request.text,
      doctor: request.doctor,
      document: request.document,
      applicant: user.id,
    };
    return await this.requestsService.createOne(new_request);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/:state')
  async changeState(
    @Param('id', ParseIntPipe) id: number,
    @Param('state', ParseIntPipe) state: number,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return await this.requestsService.updateOne(id, state, userId);
  }
}
