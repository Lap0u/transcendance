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
    return this.usersRepository.save({
      ...user, // existing fields
      filename,
      data: imageBuffer,
    });
  }

  async changeUsername(id: string, username: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return this.usersRepository.save({
      ...user, // existing fields
      accountUsername: username,
    });
  }
}
