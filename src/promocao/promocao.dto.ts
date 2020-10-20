import { Type } from "class-transformer";
import { IsByteLength, IsIn, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Validate, ValidateNested } from "class-validator";
import { ValidarHorario, Match, ValidarDia } from "src/pipes/customValidate.pipe";

class DiaPromocao {
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

  export class InsertPromocaoDto {
    @IsNotEmpty()
    @IsByteLength(0, 50)
    descricao: string;

    @IsNotEmpty()
    @IsInt()
    id_produto: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    preco: number;
  
    @ValidateNested()
    @Type(() => DiaPromocao)
    dia_promocao: DiaPromocao[];
  }

  export class GetPromocaoDto {
    @IsOptional()
    @IsByteLength(0, 50)
    descricao: string;

    @IsOptional()
    @IsNumberString()
    id_produto: number;

    
    @IsOptional()
    @IsNumberString()
    status: number;
  }

  export class PatchPromocaoDto {
    @IsOptional()
    @IsByteLength(0, 50)
    descricao: string;
    
    @IsOptional()
    @IsInt()
    @IsIn([0,1])
    status: number;
  }

  export class ResponseDiaPromocao {
    @IsNotEmpty()
    dia: string;
  
    @IsNotEmpty()
    horario: string;
  }
  
  export class ResponsePromocaoDto {
    @IsNotEmpty()
    id_promocao: number;
  
    @IsNotEmpty()
    @IsByteLength(0, 50)
    descricao: string;
  
    @IsNotEmpty()
    @IsByteLength(0, 50)
    status: string;
  
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ResponseDiaPromocao)
    dia_promocao: ResponseDiaPromocao[];
  }