import { Agendamento } from "src/agendamento/entities/agendamento.entity";
import { Role } from "@prisma/client";

export class User {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    role?: Role;
    agendamentos?: Agendamento[]
}