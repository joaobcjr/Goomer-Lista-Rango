import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { GetProdutoDto, InsertProdutoDto, PatchProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Post()
    async insertProduto(@Body(ValidationPipe) insertProdutoDto: InsertProdutoDto): Promise<Produto> {
      return this.produtoService.insertProduto(insertProdutoDto);
    }

    
  @Get('/:id')
  getProdutoByID(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.getProdutoById(id);
  }

  @Get()
  getProduto(@Query(ValidationPipe) getProdutoDto: GetProdutoDto): Promise<Produto[]> {
    return this.produtoService.getProduto(getProdutoDto);
  }

  @Patch('/:id')
  patchProduto(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) patchProdutoDto: PatchProdutoDto): Promise<Produto> {
    return this.produtoService.patchProduto(id, patchProdutoDto);
  }

  @Delete(':id')
  deleteRestaurante(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.deleteProduto(id);
  }
}
