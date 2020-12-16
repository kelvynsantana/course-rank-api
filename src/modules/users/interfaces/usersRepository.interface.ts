import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/createUser.dto';
export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
