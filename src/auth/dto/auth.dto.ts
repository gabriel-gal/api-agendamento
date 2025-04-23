import { IsEmail, IsString } from 'class-validator';
import { Auth } from '../entities/auth.entity';

export class AuthDto extends Auth {

    @IsEmail()
    email: string;

    @IsString()
    senha: string;
}