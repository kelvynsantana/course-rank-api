import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';
import IUsersRepository from '../interfaces/usersRepository.interface';

@Injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.save(user);

    return user;
  }

  async save(newUser: User): Promise<User> {
    const user = await this.usersRepository.save(newUser);

    return user;
  }
}

export { UsersRepository };
