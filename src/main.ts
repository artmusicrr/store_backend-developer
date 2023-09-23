import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // Substitua pelo seu frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);

  console.log('<<<<<<<<<<<<< 4000 >>>>>>>>>>>>>>');
}
bootstrap();
