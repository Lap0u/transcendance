import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { SocketService } from 'src/socket/socket.service';
import { Repository } from 'typeorm';
import { ScoresService } from '../../game/Scores/scores.service';
import { Accounts } from '../entities/accounts.entity';
import { TypeOrmSession } from '../entities/session.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private usersRepository: Repository<Accounts>,
    @InjectRepository(TypeOrmSession)
    private sessionsRepository: Repository<TypeOrmSession>,
    private scoreService: ScoresService,
    private readonly databaseFilesService: DatabaseFilesService,
    private socketService: SocketService,
  ) {}

  async changeAvatar(id: string, imageBuffer: Buffer, filename: string) {
    const user = await this.usersRepository.findOneBy({ id });
    const odlAvatarId = user.avatar;
    const file = await this.databaseFilesService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    const avatar = file.id;
    const updated_user = await this.usersRepository.save({
      ...user, // existing fields
      avatar,
    });
    await this.databaseFilesService.deleteFileById(odlAvatarId);
    return await updated_user;
  }

  async changeUsername(id: string, username: string) {
    const user = await this.usersRepository.findOneBy({ id });
    //   await this.scoreService.updateUsernames(user.account_id, username);
    return await this.usersRepository.save({
      ...user, // existing fields
      accountUsername: username,
    });
  }

  async checkUsernameFormat(username: string, prevUsername: string) {
    if (username === prevUsername) {
      return {
        ok1: false,
        msg1: 'Please provide a different username from your current one.',
      };
    }
    if (!/^[a-z0-9]/.test(username)) {
      return {
        ok1: false,
        msg1: 'Your username must begin with a lowercase alphanumeric character.',
      };
    }
    if (!/^[a-z0-9._-]+$/.test(username)) {
      return {
        ok1: false,
        msg1: 'Your username must contains only alphanumeric dot or hyphen and not contain uppercases.',
      };
    }
    if (username.length < 4 || username.length > 11) {
      return {
        ok1: false,
        msg1: 'Your username must contains  between 4 and 11 character',
      };
    }
    return {
      ok1: true,
      msg1: '',
    };
  }

  async checkDuplicateUsername(accountUsername: string) {
    const user = await this.usersRepository.findOneBy({ accountUsername });
    if (user == null) return { ok2: true, msg2: '' };
    return {
      ok2: false,
      msg2: 'This username is already token please choose an other',
    };
  }

  async getAllAccount() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getAvatar(id: string) {
    const avatar = await this.databaseFilesService.getFileById(id);
    return avatar;
  }

  async updateBlacklist(userId: string, newBlacklist: string[]) {
    const account = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (!account) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    account.blacklist = newBlacklist;

    const saveAccount = await this.usersRepository.save(account);

    this.socketService.socket.emit(`userUpdate:${account.id}`, account);

    return saveAccount;
  }

  async findUserById(account_id: string) {
    return await this.usersRepository.findOneBy({ account_id });
  }

  async getStatusById(account_id: string) {
    const listSessionJson = await this.sessionsRepository.find();
    for (const user of listSessionJson) {
      const info = JSON.parse(user.json);
      const isPassport = JSON.stringify(user.json).indexOf('passport');
      if (
        isPassport > -1 &&
        user.destroyedAt === null &&
        info.passport.user.account_id === account_id
      )
        return 1;
    }
    return 0;
  }

  async destroySession(account_id: string) {
    const listSessionJson = await this.sessionsRepository.find();
    for (const user of listSessionJson) {
      const info = JSON.parse(user.json);
      const isPassport = JSON.stringify(user.json).indexOf('passport');
      if (
        isPassport > -1 &&
        user.destroyedAt === null &&
        info.passport.user.account_id === account_id
      )
        info.session.destoy();
    }
  }
}
