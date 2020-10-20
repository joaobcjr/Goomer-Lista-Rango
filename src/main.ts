import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeOrmConfig } from 'config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.enableCors({
    origin: '*',
  });

  await app.listen(port);

  console.log(`Running at port => ${port}`);
}
console.log(`Inciando API, configuração DB =>`);
console.log(typeOrmConfig);
bootstrap();
