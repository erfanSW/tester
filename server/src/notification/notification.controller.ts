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
  UseGuards,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNotificationList(@Request() req) {
    const userId = req.user.userId;
    return this.notificationService.getUnseenList(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/message')
  async getMessagesList(@Request() req) {
    const userId = req.user.userId;
    return this.notificationService.getAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/seen/:id')
  async seen(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.seenNotification(id);
  }
}
