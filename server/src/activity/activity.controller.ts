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
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getActivityList(@Request() req) {
    const userId = req.user.userId;
    return this.activityService.getAll(userId);
  }
}
