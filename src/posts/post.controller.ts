import {Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { AuthGuard } from '../guards/auth.guard';
import { QueryBlogDto } from '../commonDTO/query.dto';


@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {}
    @Get()
    getAll(@Query() query: QueryBlogDto) {
        return this.postService.findAll(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.postService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.postService.deletePost(id)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: string, @Body() postDto: UpdatePostDto){
        return this.postService.updatePost(id, postDto)
    }

}