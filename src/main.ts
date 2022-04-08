import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN_WHITELIST,
  });
  app.use(cookieParser());
  //global prefix
  app.setGlobalPrefix('api/v1');

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap();
