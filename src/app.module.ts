import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteModule } from './restaurante/restaurante.module';
import { typeOrmConfig } from 'config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RestauranteModule],
})
export class AppModule {}
