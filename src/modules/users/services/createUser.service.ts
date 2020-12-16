import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BcryptHashProvider';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: BCryptHashProvider,
  ) {}

  public async execute(newUser: CreateUserDTO): Promise<User> {
    const { name, email, password } = newUser;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new HttpException('User already exists', 400);

    const hashedPass = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}
