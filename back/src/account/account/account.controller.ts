import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard, JwtTwoFactorGuard } from '../auth/guards';
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
  @UseGuards(JwtTwoFactorGuard)
  async getAccountInfo(@Req() req: Request) {
    const session_info = req.session['passport'];
    if (session_info && session_info.user) {
      const user_info = session_info.user;
      const { id } = user_info;
      const user = await this.authService.findUser(id);
      return user;
    } else {
      return new HttpException('Disconected', HttpStatus.BAD_REQUEST);
    }
    return;
  }

  @Get('/id/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async getAccountInfoById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findUserById(id);
    if (user === null) {
      res.sendStatus(404);
      return;
    }
    res.send(user);
    return user;
  }

  @Get('/userId/:id') //user.id
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async getAccountById(@Param() param) {
    return await this.usersService.findUserByUserId(param.id);
  }

  @Post('avatar')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (
      file.mimetype != 'image/jpg' &&
      file.mimetype != 'image/jpeg' &&
      file.mimetype != 'image/png'
    ) {
      res.sendStatus(400);
      return;
    }
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    const body = await this.usersService.changeAvatar(
      id,
      file.buffer,
      file.originalname,
    );
    res.send(body);
    return body;
  }

  @Get('avatar/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
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
  @UseGuards(JwtTwoFactorGuard)
  async getNullAvatar() {
    return;
  }

  @Post('username')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async changeUsername(@Req() req: Request, @Body() data: any) {
    const { newUsername, oldUsername } = data;
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    const { ok1, msg1 } = await this.usersService.checkUsernameFormat(
      newUsername,
      oldUsername,
    );
    if (!ok1) return { ok: ok1, msg: msg1 };
    const { ok2, msg2 } = await this.usersService.checkDuplicateUsername(
      newUsername,
    );
    if (!ok2) return { ok: ok2, msg: msg2 };
    await this.usersService.changeUsername(id, newUsername);
    return { ok: true, msg: '' };
  }

  @Put('blacklist')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async updateBlacklist(@Req() req: Request, @Body() data: any) {
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    const { newBlacklist } = data;
    return this.usersService.updateBlacklist(id, newBlacklist);
  }

  @Get('/all/users')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async getAllAccounts() {
    const users = await this.usersService.getAllAccount();
    return users;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  status() {
    return 'ok';
  }

  @Get('status/id/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async statusById(@Param() params) {
    return await this.usersService.getStatusById(params.id);
  }

  @Post('add-friend')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async addFriend(
    @Req() req: Request,
    @Body('friend_id', ParseUUIDPipe) friend_id: string,
  ) {
    const session_info = req.session['passport'];
    const { id } = session_info.user;
    return this.usersService.addUserToFriendList(id, friend_id);
  }
}
