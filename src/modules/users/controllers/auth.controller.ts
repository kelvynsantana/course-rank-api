import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CreateLoginService } from '../services/createLogin.service';

@Controller('sessions')
export class AuthController {
  constructor(private loginService: CreateLoginService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Request() req: any) {
    return this.loginService.execute(req.user);
  }
}
