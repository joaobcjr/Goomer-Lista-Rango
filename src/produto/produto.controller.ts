import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { InsertProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Post()
    async insertProduto(@Body(ValidationPipe) insertProdutoDto: InsertProdutoDto): Promise<Produto> {
      return this.produtoService.insertProduto(insertProdutoDto);
    }
}
