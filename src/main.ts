import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. เพิ่มบรรทัดนี้

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // 2. เพิ่มบรรทัดนี้ (สั่งเปิดใช้งานตัวตรวจสอบ)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();