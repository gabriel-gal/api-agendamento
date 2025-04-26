import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Controller('servico')
export class ServicoController {
    constructor(private readonly servicoService: ServicoService) { }

    @Get()
    findAll() {
        return this.servicoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicoService.findOne(+id);
    }

    @Post()
    create(@Body() createServicoDto: CreateServicoDto) {
        return this.servicoService.create(createServicoDto);
    }




    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.userService.remove(+id);
    // }
}