import { IsByteLength, IsIn, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class InsertProdutoDto {
    @IsNotEmpty()
    @IsByteLength(0, 50)
    nome: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    preco: number;

    @IsNotEmpty()
    @IsByteLength(0, 500)
    url_foto: string;

    @IsNotEmpty()
    @IsNumber()
    id_categoria: number;

    @IsNotEmpty()
    @IsNumber()
    id_restaurante: number;
    }

    export class GetProdutoDto {
        @IsOptional()
        @IsByteLength(0, 50)
        nome: string;
    
        @IsOptional()
        @IsNumberString()
        preco: number;
    
        @IsOptional()
        @IsByteLength(0, 500)
        url_foto: string;
    
        @IsOptional()
        @IsNumberString()
        id_categoria: number;
    
        @IsOptional()
        @IsNumberString()
        id_restaurante: number;
    }

    export class PatchProdutoDto {
        @IsNotEmpty()
        @IsByteLength(0, 50)
        nome: string;
    
        @IsNotEmpty()
        @IsNumber({ maxDecimalPlaces: 2 })
        preco: number;
    
        @IsNotEmpty()
        @IsByteLength(0, 500)
        url_foto: string;
    
        @IsNotEmpty()
        @IsNumber()
        id_categoria: number;
    
        @IsNotEmpty()
        @IsNumber()
        id_restaurante: number;
    }