import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { GetCategoriaDto, InsertCategoriaDto } from './categoria.dto';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Post()
    async insertCategoria(@Body(ValidationPipe) insertCategoriaDto: InsertCategoriaDto): Promise<Categoria> {
      return this.categoriaService.insertCategoria(insertCategoriaDto);
    }

    @Get('/:id')
    getCategoriaByID(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Categoria> {
      return this.categoriaService.getCategoriaById(id);
    }

    @Get()
    getCategoria(
      @Query(ValidationPipe) categoriaDto: GetCategoriaDto,
    ): Promise<Categoria[]> {
      return this.categoriaService.getCategoria(categoriaDto);
    }

    @Patch('/:id')
    patchRestaurante(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe) insertCategoriaDto: InsertCategoriaDto,
    ): Promise<Categoria> {
      return this.categoriaService.patchCategoria(id, insertCategoriaDto);
    }

    @Delete(':id')
    deleteRestaurante(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.categoriaService.deleteCategoria(id);
    }
}
