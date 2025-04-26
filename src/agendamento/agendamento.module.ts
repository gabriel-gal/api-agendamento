import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';

@Module({
    imports: [PrismaModule],
    controllers: [AgendamentoController],
    providers: [AgendamentoService],
    exports: [AgendamentoService],
})
export class AgendamentoModule { }
