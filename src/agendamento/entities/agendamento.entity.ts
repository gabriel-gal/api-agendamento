import { Status } from "@prisma/client";
import { Servico } from "src/servico/entities/servico.entity";
import { User } from "src/user/entities/user.entity";

export class Agendamento {
  id?: number;
  usuarioId: number;
  usuario?: User;
  servicoId: number;
  servico?: Servico;
  dataHora: Date;
  status: Status;
}