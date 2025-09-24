import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from '../modules/images/entities/image.entity';
import { ConfigParams } from '@common/config';
import { Portfolio } from '../modules/portfolio/entities/portfolio.entity';
import { User } from '../modules/user/entities/user.entity';
import { Comment } from '../modules/comments/entities/comment.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger: Logger = new Logger('Database');
        return {
          dialect: 'postgres',
          models: [Image, Portfolio, User, Comment],
          host: configService.getOrThrow<string>(ConfigParams.DB_HOST),
          port: configService.getOrThrow<number>(ConfigParams.DB_PORT),
          username: configService.getOrThrow<string>(ConfigParams.DB_USER),
          password: configService.getOrThrow<string>(ConfigParams.DB_PASS),
          database: configService.getOrThrow<string>(ConfigParams.DB_NAME),
          logging: (sql: string) => {
            logger.log(`[SQL]: ${sql}`);
          },
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
