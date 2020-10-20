import { Injectable, NotFoundException } from '@nestjs/common';
import {
  InsertRestauranteDto,
  GetRestauranteDto,
  PatchRestauranteDto,
  ResponseRestauranteDto,
} from './restaurante.dto';
import { Restaurante } from './restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorarioFuncionamento } from './horarioFuncionamento/horario.entity';
import { formatar_horario } from 'src/util/utils';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Restaurante>,

    @InjectRepository(HorarioFuncionamento)
    private readonly horarioFuncionamentoRepository: Repository<
      HorarioFuncionamento
    >,
  ) {}

  async insertRestaurante(
    insertRestauranteDto: InsertRestauranteDto,
  ): Promise<Restaurante> {
    const { nome, endereco, url_foto, horario } = insertRestauranteDto;
    const restaurante = new Restaurante();

    restaurante.nome = nome;
    restaurante.endereco = endereco;
    restaurante.url_foto = url_foto;

    await restaurante.save();
    for (const el of horario) {
      const horarioFuncionamento = new HorarioFuncionamento();
      horarioFuncionamento.restaurante = restaurante;
      horarioFuncionamento.dia_semana = el.dia_semana;
      horarioFuncionamento.horario_inicio = el.horario_inicio;
      horarioFuncionamento.horario_fim = el.horario_fim;
      await horarioFuncionamento.save();
    }

    return restaurante;
  }

  async getRestauranteById(id: number): Promise<ResponseRestauranteDto> {
    let restaurante = new ResponseRestauranteDto();
    restaurante = Object.assign(await this.restauranteRepository.findOne(id));

    restaurante.horario = formatar_horario(
      await this.horarioFuncionamentoRepository.find({
        id_restaurante: id,
      }),
    );
    return restaurante;
  }

  async getRestaurante(
    getRestauranteDto: GetRestauranteDto,
  ): Promise<ResponseRestauranteDto[]> {
    const { nome, endereco, url_foto } = getRestauranteDto;

    const restaurante = new Restaurante();

    if (nome != null && nome != '') restaurante.nome = nome;

    if (endereco != null && endereco != '') restaurante.endereco = endereco;

    if (url_foto != null && url_foto != '') restaurante.url_foto = url_foto;

    return await Promise.all(
      (await this.restauranteRepository.find(restaurante)).map(async e => {
        let restaurante = new ResponseRestauranteDto();
        restaurante = Object.assign(e);

        restaurante.horario = formatar_horario(
          await this.horarioFuncionamentoRepository.find({
            id_restaurante: e.id_restaurante,
          }),
        );
        return restaurante;
      }),
    );
  }

  async patchRestaurante(
    id: number,
    patchRestauranteDto: PatchRestauranteDto,
  ): Promise<ResponseRestauranteDto> {
    const { nome, endereco, url_foto, horario } = patchRestauranteDto;
    const restaurante = await this.restauranteRepository.findOne(id);

    if (restaurante) {
      if (nome != null && nome != '') restaurante.nome = nome;

      if (endereco != null && endereco != '') restaurante.endereco = endereco;

      if (url_foto != null && url_foto != '') restaurante.url_foto = url_foto;

      await restaurante.save();

      await this.horarioFuncionamentoRepository.delete({ id_restaurante: id });

      if (horario)
        for (const el of horario) {
          const horarioFuncionamento = new HorarioFuncionamento();
          horarioFuncionamento.restaurante = restaurante;
          horarioFuncionamento.dia_semana = el.dia_semana;
          horarioFuncionamento.horario_inicio = el.horario_inicio;
          horarioFuncionamento.horario_fim = el.horario_fim;
          await horarioFuncionamento.save();
        }

      return this.getRestauranteById(id);
    } else {
      throw new NotFoundException(`Restaurante com id ${id} não encontrado`);
    }
  }

  async deleteRestaurante(id: number): Promise<void> {
    const result = await this.restauranteRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Restaurante com ID '${id}' não encontrado`);
  }
}
