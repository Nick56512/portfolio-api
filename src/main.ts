import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigParams } from './common/config';
import { HttpExceptionFilter } from '@common/filters/http.exception.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors
          .map(
            (error) =>
              `${error.property} - ${Object.values(error.constraints || []).join('; ')}`,
          )
          .join('; ');
        return new BadRequestException(`Validation failed: ${errorMessage}`);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor())
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>(ConfigParams.APP_PORT) ?? 3000);
}
bootstrap();
