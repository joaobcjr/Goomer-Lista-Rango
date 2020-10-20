import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
      ) {}

    async insertProduto(insertProdutoDto: InsertProdutoDto): Promise<Produto> {
        const { nome, preco, url_foto } = insertProdutoDto;
        const produto = new Produto();
    
        produto.nome = nome;
        produto.preco = preco;
        produto.url_foto = url_foto;
    
        await produto.save();
    
        return produto;
      }
}
