import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards';
import { Response, Request } from 'express';
import { AccountService } from './account.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthService } from '../auth/auth.service';
import { Readable } from 'stream';

@Controller('account')
export class AccountController {
  constructor(
    private readonly usersService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAccountInfo(@Req() req: Request) {
    const session_info = req.session['passport'];
    const user_info = session_info.user;
    const { id } = user_info;
    return this.authService.findUser(id);
  }

  @Post('avatar')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return this.usersService.changeAvatar(id, file.buffer, file.originalname);
  }

  @Get('avatar/:v')
  @UseGuards(AuthenticatedGuard)
  async getAvatar(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    const user = await this.authService.findUser(id);
    const stream = Readable.from(user.data);
    const filename = user.filename.replace(/[^\x00-\x7F]/g, '?');
    response.set({
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  @Post('username')
  async changeUsername(@Req() req: Request, @Body() data: any) {
    const { newUsername } = data;
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return this.usersService.changeUsername(id, newUsername);
  }
}
