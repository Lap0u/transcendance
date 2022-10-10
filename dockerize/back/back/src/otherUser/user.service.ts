import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserBy(key: string, value: string): Promise<User> {
    return this.usersRepository.findOneBy({ [key]: value });
  }

  createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    // TODO: should check if username already exists
    user.username = body.username;
    // TODO: password should be crypt
    user.password = body.password;

    return this.usersRepository.save(user);
  }
}
