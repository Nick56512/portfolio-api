import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigParams } from '@common/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@modules/user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(ConfigParams.JWT_SECRET),
        signOptions: {
          expiresIn: configService.getOrThrow<string>(ConfigParams.JWT_EXPIRES),
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const redis = redisStore({
          socket: {
            host: configService.get<string>(ConfigParams.REDIS_HOST),
            port: configService.get<number>(ConfigParams.REDIS_PORT),
          },
        });
        return {
          store: () => redis,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, CacheModule],
})
export class AuthModule {}
