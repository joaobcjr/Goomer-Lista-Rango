import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { Produto } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
