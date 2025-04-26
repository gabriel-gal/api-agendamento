import { Agendamento } from "src/agendamento/entities/agendamento.entity";

export class Servico {
    id?: number;
    nome: string;
    duracao: number;
    preco: number;
    agendamentos?: Agendamento[]
}