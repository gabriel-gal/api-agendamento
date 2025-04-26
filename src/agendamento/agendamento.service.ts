import { Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Agendamento } from './entities/agendamento.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class AgendamentoService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createAgendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {

        const {dataHora, servicoId, status, usuarioId } = createAgendamentoDto
        const data: Prisma.AgendamentoCreateInput = {
            dataHora: new Date(dataHora),
            status,
            usuario: {
                connect: {id: usuarioId},
            },
            servico: {
                connect: {id: servicoId},
            },
        };

        const createdAgendamento = await this.prisma.agendamento.create({ data });
        return {
            ...createdAgendamento,
        };
    }

    // findByEmail(email: string) {
    //   return this.prisma.user.findUnique({ where: { email } });
    // }
    // findAll() {
    //   return `This action returns all user`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
}