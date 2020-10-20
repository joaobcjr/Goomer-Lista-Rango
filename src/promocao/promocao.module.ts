import { Module } from '@nestjs/common';
import { PromocaoService } from './promocao.service';
import { PromocaoController } from './promocao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocao } from './promocao.entity';
import { DiaPromocao } from './diaPromocao/diapromocao.entity';
import { Produto } from 'src/produto/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocao,DiaPromocao,Produto])],
  providers: [PromocaoService],
  controllers: [PromocaoController]
})
export class PromocaoModule {}
