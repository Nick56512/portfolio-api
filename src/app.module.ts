import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { PortfolioModule } from '@modules/portfolio/portfolio.module';
import { ImagesModule } from '@modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PortfolioModule,
    ImagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
