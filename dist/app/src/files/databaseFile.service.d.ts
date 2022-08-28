/// <reference types="node" />
import { Repository } from 'typeorm';
import DatabaseFile from '../entities/files.entity';
export declare class DatabaseFilesService {
    private databaseFilesRepository;
    constructor(databaseFilesRepository: Repository<DatabaseFile>);
    uploadDatabaseFile(dataBuffer: Buffer, filename: string): Promise<DatabaseFile>;
    getFileById(id: number): Promise<DatabaseFile>;
}
