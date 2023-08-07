import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const origin =
    process.env.NODE_ENV == 'prod' ? [] : ['http://localhost:8080'];

  app.enableCors({ origin });

  await app.listen(3000);
}
bootstrap();
