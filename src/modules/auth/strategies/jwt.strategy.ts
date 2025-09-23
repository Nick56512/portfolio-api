import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigParams } from 'src/config';
import { User } from '../../../modules/user/entities/user.entity';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: User,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>(ConfigParams.JWT_SECRET),
    });
  }

  async validate(userId: number): Promise<boolean> {
    /*if (!userId) {
         throw new UnauthorizedException();
      }
      const existsUser = await this.userModel.where({ id: userId })
      if (!existsUser) {
         throw new UnauthorizedException();
      }
      return { email: existsUser.email, userId: existsUser.id };*/
    return false;
  }
}
