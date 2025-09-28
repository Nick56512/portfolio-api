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
import { ConfigService } from '@nestjs/config';
import { ConfigParams } from '@common/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  public async loginByCredentials(loginRequest: LoginRequest): Promise<LoginResponse> {
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
    return this.generateTokens(user.id)
  }

  public async generateTokens(userId: number) {
    const accessToken = this.createToken(ConfigParams.JWT_ACCESS_SECRET, ConfigParams.JWT_ACCESS_EXPIRES, { userId })
    const refreshToken = this.createToken(ConfigParams.JWT_REFRESH_SECRET, ConfigParams.JWT_REFRESH_EXPIRES, { userId })
    await this.saveRefreshToCache(`${userId}`, refreshToken)
    
    return {
      accessToken,
      refreshToken
    };
  }

  private createToken(jwtSecretParam: string, jwtExpiresParam: string, payload: any = {}): string {
     const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(jwtSecretParam),
      expiresIn: this.configService.get<string>(jwtExpiresParam)
    })
    return accessToken
  }

  private saveRefreshToCache(key: string, token: string): Promise<string> {
    const refreshPayload = this.jwtService.decode(token)
    const ttl = refreshPayload.exp - Math.floor(Date.now() / 1000);
    return  this.cache.set(key, token, ttl)
  }


  public async logout(refreshToken: string): Promise<boolean> {
    const refreshPayload = this.jwtService.decode(refreshToken)
    return this.cache.del(refreshPayload.userId)
  }
}
