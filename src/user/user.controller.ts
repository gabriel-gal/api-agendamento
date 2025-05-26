import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/auth/Role/roles.decorator';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: Request
    ) {
        const usuerLogado = req.user['sub']
        if (+id !== usuerLogado) {
            throw new NotFoundException('Você só pode editar seu próprio perfil');
        }
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}