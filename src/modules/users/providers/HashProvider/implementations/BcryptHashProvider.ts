import { Injectable } from '@nestjs/common';
import IHashProvider from '../models/IHashProvider';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
