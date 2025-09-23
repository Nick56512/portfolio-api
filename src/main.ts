import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigParams } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true
  }))
  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>(ConfigParams.APP_PORT) ?? 3000);
}
bootstrap();
