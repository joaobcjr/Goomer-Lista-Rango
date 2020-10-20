import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCategoriaDto, InsertCategoriaDto } from './categoria.dto';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
      ) {}

    async insertCategoria(insertCategoriaDto: InsertCategoriaDto): Promise<Categoria> {
        const { descricao } = insertCategoriaDto;
        const categoria = new Categoria();
    
        categoria.descricao = descricao;
    
        return await categoria.save();
      }

      async getCategoriaById(id: number): Promise<Categoria> {
        return await this.categoriaRepository.findOne(id);
      }
      
      async getCategoria(categoriaDto: GetCategoriaDto): Promise<Categoria[]> {
        const { descricao } = categoriaDto;
        const categoria = new Categoria();

        if (descricao != null && descricao != '') categoria.descricao = descricao;
        
        return await this.categoriaRepository.find(categoria)
      }

      async patchCategoria(id: number,insertCategoriaDto: InsertCategoriaDto): Promise<Categoria> {
        const { descricao } = insertCategoriaDto;
        const categoria = await this.categoriaRepository.findOne(id);
    
        if (categoria) {
          if (descricao != null && descricao != '') categoria.descricao = descricao;
    
          return await categoria.save();

        } else {
          throw new NotFoundException(`Categoria com id ${id} não encontrado`);
        }
      }

      async deleteCategoria(id: number): Promise<void> {
        const result = await this.categoriaRepository.delete(id);
        if (result.affected === 0)
          throw new NotFoundException(`Categoria com ID '${id}' não encontrado`);
      }
}
