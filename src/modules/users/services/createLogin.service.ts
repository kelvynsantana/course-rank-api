import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  ICreateJWTResponse,
  ICreateLogin,
} from '../interfaces/validateUserResponse.interface';

@Injectable()
export class CreateLoginService {
  constructor(private jwtService: JwtService) {}
  async execute({
    id,
    name,
    email,
  }: ICreateLogin): Promise<ICreateJWTResponse> {
    const payload = {
      email,
      sub: id,
      name,
    };

    return {
      id,
      email,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
