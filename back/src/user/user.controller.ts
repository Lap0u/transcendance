import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.service.getUserBy('id', id);
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.service.getUserBy('username', username);
  }

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
