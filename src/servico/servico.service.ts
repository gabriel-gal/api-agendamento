import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Servico } from './entities/servico.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicoService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createServicoDto: CreateServicoDto): Promise<Servico> {
    const data: Prisma.ServicoCreateInput = {
      ...createServicoDto,
    };

    const createdServico = await this.prisma.servico.create({ data });

    return {
      ...createdServico,
    };
  }

  // async create(createUserDto: CreateServicoDto): Promise<Servico> {
  //   const data: Prisma.UserCreateInput = {
  //     ...createUserDto,
  //     senha: await bcrypt.hash(createUserDto.senha, 10),
  //   };

  //   const createdUser = await this.prisma.user.create({ data });

  //   return {
  //     ...createdUser,
  //     senha: undefined,
  //   };
  // }

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