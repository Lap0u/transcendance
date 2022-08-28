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

  @Post('avatar')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return this.usersService.addAvatar(id, file.buffer, file.originalname);
  }

  @Get('test')
  test() {
    return 'test';
  }
}
