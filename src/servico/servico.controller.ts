import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { CreateServicoDto } from './dto/create-servico.dto';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Role } from 'src/auth/Role/roles.decorator';
import { ServicoService } from './servico.service';

@Controller('servico')
export class ServicoController {
    constructor(private readonly servicoService: ServicoService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.servicoService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.servicoService.findOne(+id);
    }

    @Post()
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() createServicoDto: CreateServicoDto) {
        return this.servicoService.create(createServicoDto);
    }

    @Patch(':id')
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
        return this.servicoService.update(+id, updateServicoDto);
    }

    @Delete(':id')
    @Role('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    remove(@Param('id') id: string) {
        return this.servicoService.remove(+id);
    }
}