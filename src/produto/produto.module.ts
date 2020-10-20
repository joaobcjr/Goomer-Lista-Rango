import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { Produto } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { Categoria } from 'src/categoria/categoria.entity';
import { Restaurante } from 'src/restaurante/restaurante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto,Categoria,Restaurante])],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
