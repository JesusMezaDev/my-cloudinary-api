import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log('url', process.env.MY_JOURNAL_URL);
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.MY_JOURNAL_URL],
      methods: ['POST', 'DELETE'],
      preflightContinue: false,
    }
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe ({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
