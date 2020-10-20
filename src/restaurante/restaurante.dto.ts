import {
  IsNotEmpty,
  IsByteLength,
  IsOptional,
  IsInt,
  Validate,
  ValidateNested,
  IsIn,
} from 'class-validator';

import {
  ValidarHorario,
  ValidarDia,
  Match,
} from './pipes/validateRestaurante.pipe';

import { Type } from 'class-transformer';

class HorarioFuncionamento {
  @Validate(ValidarDia)
  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5, 6, 7])
  dia_semana: number;

  @Validate(ValidarHorario)
  @IsNotEmpty()
  @IsInt()
  horario_inicio: number;

  @Match('horario_inicio')
  @Validate(ValidarHorario)
  @IsNotEmpty()
  @IsInt()
  horario_fim: number;
}

export class InsertRestauranteDto {
  @IsNotEmpty()
  @IsByteLength(0, 10)
  nome: string;

  @IsNotEmpty()
  @IsByteLength(0, 100)
  endereco: string;

  @IsNotEmpty()
  @IsByteLength(0, 500)
  url_foto: string;

  @ValidateNested()
  @Type(() => HorarioFuncionamento)
  horario: HorarioFuncionamento[];
}

export class GetRestauranteDto {
  @IsOptional()
  @IsByteLength(0, 10)
  nome: string;

  @IsOptional()
  @IsByteLength(0, 100)
  endereco: string;

  @IsOptional()
  @IsByteLength(0, 500)
  url_foto: string;
}

export class PatchRestauranteDto {
  @IsOptional()
  @IsByteLength(0, 10)
  nome: string;

  @IsOptional()
  @IsByteLength(0, 100)
  endereco: string;

  @IsOptional()
  @IsByteLength(0, 500)
  url_foto: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HorarioFuncionamento)
  horario: HorarioFuncionamento[];
}

export class ResponseHorarioFuncionamento {
  @IsNotEmpty()
  dia: string;

  @IsNotEmpty()
  horario: string;
}

export class ResponseRestauranteDto {
  @IsNotEmpty()
  id_restaurante: number;

  @IsNotEmpty()
  @IsByteLength(0, 10)
  nome: string;

  @IsNotEmpty()
  @IsByteLength(0, 100)
  endereco: string;

  @IsNotEmpty()
  @IsByteLength(0, 500)
  url_foto: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ResponseHorarioFuncionamento)
  horario: ResponseHorarioFuncionamento[];
}
