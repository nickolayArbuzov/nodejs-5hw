import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async login(authDto: AuthDto) {
    const auth = await this.userRepository.findOne({where: {login: authDto.login, password: authDto.password}})
    if (auth) {
      return auth
    } 
    else {
      throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
  }
  
}