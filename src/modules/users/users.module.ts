import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BcryptHashProvider';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserService } from './services/createUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [BCryptHashProvider, CreateUserService, UsersRepository],
})
export class UsersModule {}
