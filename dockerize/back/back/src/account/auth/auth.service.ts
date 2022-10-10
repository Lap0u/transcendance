import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../entities/accounts.entity';
import { AuthentificationProvider } from './auth';
import { IntraUserDetails } from '../utils/types';
import { SocketService } from '../../socket/socket.service';

@Injectable()
export class AuthService implements AuthentificationProvider {
  constructor(
    @InjectRepository(Accounts) private userRepo: Repository<Accounts>,
  ) {}

  async validateUser(details: IntraUserDetails) {
    const { id } = details;
    const user = await this.userRepo.findOneBy({ id });
    if (user) return user;
    return this.createUser(details);
  }
  createUser(details: IntraUserDetails) {
    const user = this.userRepo.create(details);
    return this.userRepo.save(user);
  }
  findUser(id: string): Promise<Accounts | undefined> {
    return this.userRepo.findOneBy({ id });
  }
}
