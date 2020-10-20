import { IsByteLength, IsNotEmpty, IsNumber } from "class-validator";

export class InsertProdutoDto {
    @IsNotEmpty()
    @IsByteLength(0, 10)
    nome: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    preco: number;

    @IsNotEmpty()
    @IsByteLength(0, 500)
    url_foto: string;
    }