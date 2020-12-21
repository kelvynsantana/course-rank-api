import { Injectable } from '@nestjs/common';
import { ValidateUserDTO } from '../dtos/validateUser.dto';
import { ICreateLogin } from '../interfaces/validateUserResponse.interface';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BcryptHashProvider';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class ValidateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: BCryptHashProvider,
  ) {}
  async execute({
    email,
    password,
  }: ValidateUserDTO): Promise<ICreateLogin | null> {
    const user = await this.usersRepository.findByEmail(email);

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (user && passwordMatch) {
      const { id, name, email } = user;
      return {
        id,
        name,
        email,
      };
    }

    return null;
  }
}
