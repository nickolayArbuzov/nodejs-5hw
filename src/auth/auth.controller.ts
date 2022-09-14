import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(204)
    @Post('login')
    login(@Body() authDto: AuthDto ){
        return this.authService.login(authDto)
    }

}