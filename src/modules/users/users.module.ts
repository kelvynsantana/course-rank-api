import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstant } from './constants/jwt.constants';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BcryptHashProvider';
import { UsersRepository } from './repositories/users.repository';
import { CreateLoginService } from './services/createLogin.service';
import { CreateUserService } from './services/createUser.service';
import { ValidateUserService } from './services/validateUser.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {
        expiresIn: jwtConstant.expiresIn,
      },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    BCryptHashProvider,
    CreateUserService,
    UsersRepository,
    CreateLoginService,
    ValidateUserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UsersModule {}
