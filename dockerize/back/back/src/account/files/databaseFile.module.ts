import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFile from '../entities/files.entity';
import DatabaseFilesController from './databaseFile.controller';
import { DatabaseFilesService } from './databaseFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile]), DatabaseFileModule],
  controllers: [DatabaseFilesController],
  providers: [DatabaseFilesService],
})
export class DatabaseFileModule {}
