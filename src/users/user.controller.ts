import {Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from '../commonDTO/query.dto';
import { AuthGuard } from '../guards/auth.guard';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getAll(@Query() query: QueryUserDto) {
        return this.userService.findAll(query)
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

}