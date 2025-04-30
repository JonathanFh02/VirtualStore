import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
const AWS = require('aws-sdk');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const dynamo = new AWS.DynamoDB();
  dynamo.listTables({}, (err, data) => {
    if (err) console.error('Error al listar tablas:', err);
    else console.log('Tablas DynamoDB:', data.TableNames);
  });
}
bootstrap();
