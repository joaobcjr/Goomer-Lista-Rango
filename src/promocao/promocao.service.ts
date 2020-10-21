import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/produto/produto.entity';
import { formatar_promocao, formatar_status } from 'src/util/utils';
import { Repository } from 'typeorm';
import { DiaPromocao } from './diaPromocao/diapromocao.entity';
import { GetPromocaoDto, InsertPromocaoDto, PatchPromocaoDto, ResponsePromocaoDto } from './promocao.dto';
import { Promocao } from './promocao.entity';

@Injectable()
export class PromocaoService {
    @InjectRepository(Promocao)
    private readonly promocaoRepository: Repository<Promocao>;

    @InjectRepository(DiaPromocao)
    private readonly diapromocaoRepository: Repository<DiaPromocao>;

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>;

    async getPromocaoById(id: number): Promise<ResponsePromocaoDto> {
      const promocao = await this.promocaoRepository.findOne(id)
      let promocaoResponse = new ResponsePromocaoDto();
      promocaoResponse = Object.assign(await this.promocaoRepository.findOne(id));
      promocaoResponse.dia_promocao = formatar_promocao(await this.diapromocaoRepository.find({id_promocao: id}));
      promocaoResponse.status = formatar_status(promocao.status);
      return promocaoResponse;
    }


    async insertPromocao(insertPromocaoDto: InsertPromocaoDto): Promise<ResponsePromocaoDto> {
      const { descricao, id_produto, dia_promocao, preco } = insertPromocaoDto;
      const promocao = new Promocao();

      if (!(await this.produtoRepository.findOne(id_produto)))
        throw new NotFoundException(`Produto com ID '${id_produto}' não encontrado`);

      promocao.descricao = descricao;
      promocao.id_produto = id_produto;
      promocao.status = 1;
      promocao.preco = preco;
      await promocao.save();

      await Promise.all(dia_promocao.map(async e=>{
          const diapromocao = new DiaPromocao();
          diapromocao.id_promocao = promocao.id_promocao;
          diapromocao.dia_semana = e.dia_semana;
          diapromocao.horario_inicio = e.dia_semana;
          diapromocao.horario_fim = e.horario_fim;
          await diapromocao.save();
      }));

      return this.getPromocaoById(promocao.id_promocao);
    }

    async getPromocao(getPromocaoDto: GetPromocaoDto): Promise<ResponsePromocaoDto[]> {
      const { descricao, id_produto, status } = getPromocaoDto;

      const promocao = new Promocao();
  
      if (descricao != null && descricao != '') 
        promocao.descricao = descricao;
  
      if (id_produto != null)
        promocao.id_produto = id_produto;

      if (status != null)
        promocao.status = status;
  
      return await Promise.all(
        (await this.promocaoRepository.find(promocao)).map(async e => {
          let promocao = new ResponsePromocaoDto();
          promocao = Object.assign(e);
  
          promocao.dia_promocao = formatar_promocao(await this.diapromocaoRepository.find({id_promocao: e.id_promocao}));

          return promocao;
        }),
      );
    }
    
      async patchPromocao(id: number,patchPromocaoDto: PatchPromocaoDto): Promise<ResponsePromocaoDto> {
        const { descricao, status } = patchPromocaoDto;
        const promocao = await this.promocaoRepository.findOne(id);
        if(promocao){
          
          if (descricao != null && descricao != '') 
            promocao.descricao = descricao;

          if (status != null)
            promocao.status = status;

          await promocao.save();
          
          return this.getPromocaoById(id);
        } else {
          throw new NotFoundException(`Promocao com id ${id} não encontrado`);
        }
      }

}
