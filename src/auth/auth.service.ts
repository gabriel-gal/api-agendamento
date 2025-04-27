import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async validaAuth(authDto: AuthDto) {
        const { email, senha } = authDto;

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Email ou senha incorretos');

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) { throw new UnauthorizedException('Email ou senha incorretos') }

        const payload = {
            sub: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
        };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
        };
    }
}
