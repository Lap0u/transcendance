import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../entities/accounts.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private usersRepository: Repository<Accounts>,
    private readonly databaseFilesService: DatabaseFilesService,
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
    return updated_user;
  }

  async changeUsername(id: string, username: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return this.usersRepository.save({
      ...user, // existing fields
      accountUsername: username,
    });
  }

  async checkDuplicateUsername(accountUsername: string) {
    const user = await this.usersRepository.findOneBy({ accountUsername });
    if (user == null) return true;
    return false;
  }

  async getAllAccount() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getAvatar(id: string) {
    const avatar = await this.databaseFilesService.getFileById(id);
    return avatar;
  }
}
