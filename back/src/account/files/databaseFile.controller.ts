import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  ParseIntPipe,
  StreamableFile,
} from '@nestjs/common';
import { DatabaseFilesService } from './databaseFile.service';
import { Readable } from 'stream';
import { Response } from 'express';

@Controller('account/avatar/file')
@UseInterceptors(ClassSerializerInterceptor)
export default class DatabaseFilesController {
  constructor(private readonly databaseFilesService: DatabaseFilesService) {}

  @Get()
  defaultReturn() {
    return;
  }

  @Get(':id')
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.databaseFilesService.getFileById(id);

    const stream = Readable.from(file.data);
    const filename = file.filename.replace(/[^\x00-\x7F]/g, '?');
    response.set({
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }
}
