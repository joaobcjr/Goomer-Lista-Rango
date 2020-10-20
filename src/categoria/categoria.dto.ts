import { IsByteLength, IsNotEmpty, IsOptional } from "class-validator";

export class InsertCategoriaDto {
    @IsNotEmpty()
    @IsByteLength(0, 50)
    descricao: string;
}

export class GetCategoriaDto {
    @IsOptional()
    @IsByteLength(0, 50)
    descricao: string;
}