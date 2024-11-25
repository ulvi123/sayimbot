import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(__dirname, '..', '.env');
console.log('Checking for .env file at:', envPath);
console.log('.env file exists:', fs.existsSync(envPath));
if (fs.existsSync(envPath)) {
  console.log('.env file contents:');
  console.log(fs.readFileSync(envPath, 'utf8'));
}


import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  console.log('Current working directory:', process.cwd());
  const result = dotenv.config();
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('Loaded env variables:', result.parsed);
  }
  console.log('JWT_SECRET from process.env:', process.env.JWT_SECRET);

  const app = await NestFactory.create(AppModule);
  
  // CORS configuration
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
  }));

  await app.listen(3000);
}
bootstrap();