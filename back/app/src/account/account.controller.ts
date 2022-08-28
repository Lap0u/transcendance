import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Accounts } from '../entities/accounts.entity';
import { AuthenticatedGuard } from '../auth/guards';
import { Response, Request } from 'express';
import { AccountService } from './account.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly usersService: AccountService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAccountInfo(@Req() req: Request) {
    const session_info = req.session['passport'];
    const user_info = session_info.user;
    return user_info;
  }

  @Get('avatar')
  addAvatar() {
    return 'haha';
  }

  @Get('test')
  test() {
    return 'test';
  }
}
