import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigParams } from '@common/config';
import { User } from '@modules/user/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>(ConfigParams.JWT_REFRESH_SECRET),
    });
  }

  async validate(payload: any): Promise<number> {
    const userId: number = payload.userId;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
    }
    const session = await this.cache.get<string>(`${userId}`)
    if(!session) {
        throw new UnauthorizedException('Invalid refresh token');
    }
    return payload;
  }
}