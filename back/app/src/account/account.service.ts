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

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.databaseFilesService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    await this.usersRepository.update(userId, {
      avatar: avatar.id,
    });
    return avatar;
  }
}
