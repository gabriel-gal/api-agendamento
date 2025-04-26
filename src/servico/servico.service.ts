import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Servico } from './entities/servico.entity';
import { Prisma } from '@prisma/client';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicoService {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Servico[]> {
        const servicos = await this.prisma.servico.findMany({
            include: {
                agendamento: true,
            },
        })
        if (!servicos) {
            throw new NotFoundException(`Nenhum serviço cadastrado`);
        }
        return servicos
    }

    async findOne(id: number): Promise<Servico> {
        const servico = await this.prisma.servico.findUnique({
            where: { id },
            include: {
                agendamento: true,
            },
        })
        if (!servico) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        return servico
    }

    async create(createServicoDto: CreateServicoDto): Promise<Servico> {
        const data: Prisma.ServicoCreateInput = {
            ...createServicoDto,
        };
        const createdServico = await this.prisma.servico.create({ data });
        return {
            ...createdServico,
        };
    }

    async update(id: number, updateServicoDto: UpdateServicoDto): Promise<Servico> {
        const servicoExiste = await this.prisma.servico.findUnique({
            where: { id },
        });
        if (!servicoExiste) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`)
        }
        const updateServico = await this.prisma.servico.update({
            where: { id },
            data: updateServicoDto,
        })
        return updateServico
    }

    async remove(id: number): Promise<Servico> {
        const servicoExiste = await this.prisma.servico.findUnique({
            where: { id },
        });
        if (!servicoExiste) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`)
        }
        const deleteServico = await this.prisma.servico.delete({
            where: { id },
        })
        return deleteServico
    }
}