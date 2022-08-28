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

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    const avatar = await this.databaseFilesService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    console.log('id', userId, 'avatar', avatar.id);
    await this.usersRepository.update({ id: userId }, { avatar: avatar.id });
    return avatar;
  }
}
