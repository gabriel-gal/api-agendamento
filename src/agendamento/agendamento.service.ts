import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Agendamento } from './entities/agendamento.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AgendamentoService {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Agendamento[]> {
        const agendamentos = await this.prisma.agendamento.findMany({
            include: {
                usuario: true,
                servico: true,
            },
        });
        if (!agendamentos) {
            throw new NotFoundException(`Nenhum agendamento cadastrado`);
        }
        return agendamentos
    }

    async findOne(id: number): Promise<Agendamento> {
        const agendamento = await this.prisma.agendamento.findUnique({
            where: { id },
            include: {
                usuario: true,
                servico: true,
            },
        })
        if (!agendamento) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
        }
        return agendamento
    }

    async create(createAgendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {
        const { dataHora, servicoId, status, usuarioId } = createAgendamentoDto
        const data: Prisma.AgendamentoCreateInput = {
            dataHora: new Date(dataHora),
            status,
            usuario: {
                connect: { id: usuarioId },
            },
            servico: {
                connect: { id: servicoId },
            },
        };
        const createdAgendamento = await this.prisma.agendamento.create({ data });
        return {
            ...createdAgendamento,
        };
    }

    async update(id: number, updateAgendamentoDto: UpdateAgendamentoDto): Promise<Agendamento> {
        const agendamentoExiste = await this.prisma.agendamento.findUnique({
            where: { id },
        });
        if (!agendamentoExiste) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`)
        }
        const { dataHora, status, usuarioId, servicoId } = updateAgendamentoDto;
        const data: Prisma.AgendamentoUpdateInput = {
            ...(dataHora && { dataHora: new Date(dataHora) }),
            ...(status && { status }),
            ...(usuarioId && {
                usuario: {
                    connect: { id: usuarioId },
                },
            }),
            ...(servicoId && {
                servico: {
                    connect: { id: servicoId },
                },
            }),
        };
        const agendamentoAtualizado = await this.prisma.agendamento.update({
            where: { id },
            data,
            include: {
                usuario: true,
                servico: true,
            },
        });
        return agendamentoAtualizado
    }

    async remove(id: number): Promise<Agendamento> {
        const agendamentoExiste = await this.prisma.agendamento.findUnique({
            where: { id },
        });
        if (!agendamentoExiste) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`)
        }
        const deleteAgendamento = await this.prisma.agendamento.delete({
            where: { id },
            include: {
                usuario: true,
                servico: true,
            }
        })
        return deleteAgendamento
    }
}