import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { AgendamentoService } from './agendamento.service';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Role } from 'src/auth/Role/roles.decorator';
import { Request } from 'express';

@Controller('agendamento')
export class AgendamentoController {
    constructor(private readonly agendamentoService: AgendamentoService) { }

    @Get('admin')
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAllAdmin() {
        return this.agendamentoService.findAll();
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req: Request) {
        const user = req.user;
        return this.agendamentoService.findByUserId(user['sub']);
    }

    @Get('admin/:id')
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    findOneAdmin(@Param('id') id: string) {
        return this.agendamentoService.findOne(+id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string, @Req() req: Request) {
        return this.agendamentoService.findOneByUser(+id, req.user['sub']);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
        return this.agendamentoService.create(createAgendamentoDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateAgendamentoDto: UpdateAgendamentoDto) {
        return this.agendamentoService.update(+id, updateAgendamentoDto);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.agendamentoService.remove(+id);
    // }
}