import { IsString, IsNumber } from 'class-validator';

export class CreateServicoDto {
    @IsString()
    nome: string;

    @IsNumber()
    duracao: number;

    @IsNumber()
    preco: number;
}