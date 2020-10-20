import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteModule } from './restaurante/restaurante.module';
import { typeOrmConfig } from 'config/typeorm.config';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RestauranteModule, ProdutoModule]
})
export class AppModule {}
