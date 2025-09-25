import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@modules/user/entities/user.entity';
import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.userModel.findOne({
      where: {
        ...loginRequest,
      },
    });
    if (!user) {
      throw new NotFoundException(
        'User does not exists. Please, check password and email',
      );
    }
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  public async logout(token: string) {
    const payload = this.jwtService.decode(token);
    //const ttl = payload.exp - Math.floor(Date.now() / 1000)
    await this.cache.set<string>(payload.userId.toString(), token);
  }
}
