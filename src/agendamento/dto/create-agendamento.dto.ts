import { Status } from '@prisma/client';
import { Agendamento } from '../entities/agendamento.entity';
import { IsDateString, IsEnum, IsInt, } from 'class-validator';

export class CreateAgendamentoDto extends Agendamento {

    @IsInt()
    usuarioId: number;   

    @IsInt()
    servicoId: number;  

    @IsDateString()
    dataHora: Date;  

    @IsEnum(Status)
    status: Status;
}