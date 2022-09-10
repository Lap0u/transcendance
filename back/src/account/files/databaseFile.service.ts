import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseFile from '../entities/files.entity';

@Injectable()
export class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer,
    });
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(id: string) {
    const file = await this.databaseFilesRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async getFileByName(filename: string) {
    const file = await this.databaseFilesRepository.findOneBy({ filename });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async counRaws() {
    const count = await this.databaseFilesRepository.count();
    return count;
  }

  async initDBFiles() {
    const count = await this.databaseFilesRepository.count();
    if (count !== 0) return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    const buffer = await fs.readFileSync(
      process.cwd() + '/src/account/avatar/loup.png',
    );
    this.uploadDatabaseFile(buffer, 'default');
  }
}
