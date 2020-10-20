import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteModule } from './restaurante/restaurante.module';
import { typeOrmConfig } from 'config/typeorm.config';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { PromocaoModule } from './promocao/promocao.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RestauranteModule, ProdutoModule, CategoriaModule, PromocaoModule]
})
export class AppModule {}
