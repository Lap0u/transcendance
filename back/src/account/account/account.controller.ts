import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import DatabaseFile from '../entities/files.entity';

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
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return await this.usersService.changeAvatar(
      id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('avatar/:id')
  @UseGuards(AuthenticatedGuard)
  async getAvatar(
    @Param() params,
    @Res({ passthrough: true }) response: Response,
  ) {
    const id: string = params.id;
    const avatar: DatabaseFile = await this.usersService.getAvatar(id);
    const stream = Readable.from(avatar.data);
    const filename = avatar.filename.replace(/[^\x00-\x7F]/g, '?');
    response.set({
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Type': 'image',
    });
    return new StreamableFile(stream);
  }

  @Get('avatar')
  @UseGuards(AuthenticatedGuard)
  async getNullAvatar() {
    return;
  }

  @Post('username')
  @UseGuards(AuthenticatedGuard)
  async changeUsername(@Req() req: Request, @Body() data: any) {
    const { newUsername } = data;
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return this.usersService.changeUsername(id, newUsername);
  }

  @Get('username/validate/:username')
  @UseGuards(AuthenticatedGuard)
  async validateUsername(@Param() params) {
    return this.usersService.checkDuplicateUsername(params.username);
  }

  @Get('/all')
  @UseGuards(AuthenticatedGuard)
  async getAllAccounts() {
    const users = await this.usersService.getAllAccount();
    return users;
  }
}
