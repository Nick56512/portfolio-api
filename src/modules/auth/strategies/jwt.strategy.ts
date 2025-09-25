import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigParams } from '@common/config';
import { User } from '@modules/user/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>(ConfigParams.JWT_SECRET),
    });
  }

  async validate(payload: any): Promise<number> {

    const userId: number = payload.userId;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const fromBlacklist = await this.cache.get<string>(userId.toString())
    if(fromBlacklist) {
      throw new UnauthorizedException('You have been logged out, please log in again');
    }
    
    return payload
  }
}
