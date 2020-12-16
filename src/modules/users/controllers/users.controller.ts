import { Body, Controller, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';
import { CreateUserService } from '../services/createUser.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUserService) {}
  @Post()
  async create(@Body() newUser: CreateUserDTO): Promise<User> {
    const user = await this.createUser.execute(newUser);

    return classToClass(user);
  }
}
