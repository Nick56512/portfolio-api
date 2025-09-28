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
import { JwtAccessStrategy } from './strategies/jwt.access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    JwtModule,
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
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [JwtModule, CacheModule],
})
export class AuthModule {}
