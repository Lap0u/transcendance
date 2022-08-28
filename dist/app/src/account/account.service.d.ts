/// <reference types="node" />
import { Repository } from 'typeorm';
import { Accounts } from '../entities/accounts.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';
export declare class AccountService {
    private usersRepository;
    private readonly databaseFilesService;
    constructor(usersRepository: Repository<Accounts>, databaseFilesService: DatabaseFilesService);
    addAvatar(userId: number, imageBuffer: Buffer, filename: string): Promise<import("../entities/files.entity").default>;
}
