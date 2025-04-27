import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            include: {
                agendamento: true,
            },
        })
        if (!users) {
            throw new NotFoundException(`Nenhum User cadastrado`);
        }
        return users
    }

    async findOne(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                agendamento: true,
            },
        })
        if (!user) {
            throw new NotFoundException(`User com ID ${id} não encontrado`);
        }
        return user
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const verificaEmail = await this.findByEmail(createUserDto.email)
        if (verificaEmail) {
            throw new NotFoundException(`Email já existente`);
        }
        const data: Prisma.UserCreateInput = {
            ...createUserDto,
            senha: await bcrypt.hash(createUserDto.senha, 10),
        };
        const createdUser = await this.prisma.user.create({ data });
        return {
            ...createdUser,
            senha: undefined,
        };
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const userExiste = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!userExiste) {
            throw new NotFoundException(`User com ID ${id} não encontrado`)
        }
        const updateUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        })
        return updateUser
    }

    async remove(id: number): Promise<User> {
        const userExiste = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!userExiste) {
            throw new NotFoundException(`User com ID ${id} não encontrado`)
        }
        const deleteUser = await this.prisma.user.delete({
            where: { id },
        })
        return deleteUser
    }
}