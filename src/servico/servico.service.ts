import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Servico } from './entities/servico.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicoService {

  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Servico[]> {

    const servicos = await this.prisma.servico.findMany()

    return servicos
  }

  async findOne(id: number): Promise<Servico> {

    const servico = await this.prisma.servico.findUnique({
      where: {id},
    })
    
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

  // findByEmail(email: string) {
  //   return this.prisma.user.findUnique({ where: { email } });
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