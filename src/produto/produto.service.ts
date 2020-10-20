import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { Restaurante } from 'src/restaurante/restaurante.entity';
import { Repository } from 'typeorm';
import { GetProdutoDto, InsertProdutoDto, PatchProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,

        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,

        @InjectRepository(Restaurante)
        private readonly restauranteRepository: Repository<Restaurante>,
      ) {}

    async insertProduto(insertProdutoDto: InsertProdutoDto): Promise<Produto> {
        const { nome, preco, url_foto, id_categoria, id_restaurante } = insertProdutoDto;
        const produto = new Produto();
    
        if (!(await this.categoriaRepository.findOne(id_categoria)))
          throw new NotFoundException(`Categoria com ID '${id_categoria}' não encontrado`);

        if (!(await this.restauranteRepository.findOne(id_restaurante)))
          throw new NotFoundException(`Restaurante com ID '${id_categoria}' não encontrado`);

        produto.nome = nome;
        produto.preco = preco;
        produto.url_foto = url_foto;
        produto.id_categoria = id_categoria;
        produto.id_restaurante = id_restaurante;
    
        await produto.save();
        
        return await this.getProdutoById(produto.id_produto);
      }

      async getProdutoById(id: number): Promise<Produto> {
        const query = this.produtoRepository.createQueryBuilder('produto');
        query.addSelect('categoria.id_categoria');
        query.addSelect('categoria.descricao');
        query.addSelect('restaurante.id_restaurante');
        query.addSelect('restaurante.nome');
    
        query.andWhere(`produto.id_produto = '${id}'`);
    
        query.innerJoin('produto.categoria', 'categoria');
        query.innerJoin('produto.restaurante', 'restaurante');
    
        query.orderBy('produto.id_produto');
    
        return await query.getOne();
      }

      async getProduto(getProdutoDto: GetProdutoDto): Promise<Produto[]> {
        const { nome, preco, url_foto,id_categoria,id_restaurante } = getProdutoDto;
        
        const query = this.produtoRepository.createQueryBuilder('produto');
        query.addSelect('categoria.id_categoria');
        query.addSelect('categoria.descricao');
        query.addSelect('restaurante.id_restaurante');
        query.addSelect('restaurante.nome');
    
        if (nome != null && nome != '')
          query.andWhere(`produto.nome = '${nome}'`);
        
        if (preco != null)
          query.andWhere(`produto.preco = '${preco}'`)
        
        if (url_foto != null && url_foto != '')
          query.andWhere(`produto.url_foto = '${url_foto}'`)
        
        if (id_categoria != null) 
          query.andWhere(`produto.id_categoria = '${id_categoria}'`)
        
        if (id_restaurante != null) 
          query.andWhere(`produto.id_restaurante = '${id_restaurante}'`)
    
        query.innerJoin('produto.categoria', 'categoria');
        query.innerJoin('produto.restaurante', 'restaurante');
    
        query.orderBy('produto.id_produto');
    
        return await query.getMany();
      }

      async patchProduto(id: number,patchProdutoDto: PatchProdutoDto): Promise<Produto> {
        const { nome, preco, url_foto,id_categoria,id_restaurante } = patchProdutoDto;
        
        const produto = await this.produtoRepository.findOne(id);
    
        if (produto) {

          if (nome != null && nome != '')
            produto.nome = nome;

          if (preco != null)
            produto.preco = preco;

          if (url_foto != null && url_foto != '')
            produto.url_foto = url_foto;

          if (id_categoria != null && produto.id_categoria != id_categoria)
          {
            const categoria = await this.categoriaRepository.findOne(id_categoria);
            if(categoria)
              produto.id_categoria = id_categoria;
            else
              throw new NotFoundException(`Categoria com id ${id_categoria} não encontrado`);

          }

          if (id_restaurante != null && produto.id_restaurante != id_restaurante)
          {
            const restaurante = await this.restauranteRepository.findOne(id_restaurante);
            if(restaurante)
              produto.id_restaurante = id_restaurante;
            else
              throw new NotFoundException(`Restaurante com id ${id_restaurante} não encontrado`);
          }
    
          await produto.save();

          return await this.getProdutoById(produto.id_produto);

        } else {
          throw new NotFoundException(`Produto com id ${id} não encontrado`);
        }
      }

      async deleteProduto(id: number): Promise<void> {
        const result = await this.produtoRepository.delete(id);
        if (result.affected === 0)
          throw new NotFoundException(`Produto com ID '${id}' não encontrado`);
      }
}
