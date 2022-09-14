import {Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards, Request} from '@nestjs/common';
import { CratePostDtoWithoutBlogId, CreatePostDto } from '../posts/dto/post.dto';
import { PostService } from '../posts/post.service';
import { AuthGuard } from '../guards/auth.guard';
import {BloggerService} from "./blogger.service";
import { CreateBloggerDto, UpdateBloggerDto } from './dto/blogger.dto';
import { QueryBlogDto } from '../commonDTO/query.dto';


@Controller('blogs')
export class BloggerController {

    constructor(
        private bloggerService: BloggerService,
        private postService: PostService,
    ) {}
    @Get()
    getAll(@Query() query: QueryBlogDto) {
        return this.bloggerService.findAll(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.bloggerService.findOne(id)
    }

    @Get(':id/posts') 
    getPostByBlogId(@Param('id') id: string, @Query() query: QueryBlogDto) { 
        return this.bloggerService.findAllPostsByBlogId(id, query)
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() bloggerDto: CreateBloggerDto) {
        return this.bloggerService.createBlogger(bloggerDto);
    }

    @UseGuards(AuthGuard)
    @Post(':id/posts') 
    creatPostForBlogId(@Param('id') id: string, @Body() postDto: CratePostDtoWithoutBlogId) {
        return this.postService.creatPostForBlogId(id, postDto)
    }
    /*creatPostForBlogId(@Param('id') id: string, @Request() req) {

        // return this.postService.creatPostForBlogId(id, postDto)
    }*/

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.bloggerService.deleteBlogger(id)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: string, @Body() bloggerDto: UpdateBloggerDto){
        return this.bloggerService.updateBlogger(id, bloggerDto)
    }

}