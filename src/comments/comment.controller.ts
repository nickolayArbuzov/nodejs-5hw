import {Body, Controller, Get, Post} from '@nestjs/common';
import {CommentService} from "./comment.service";
import { CreateCommentDto } from './dto/create-comment.dto';


@Controller('comments')
export class CommentController {

    constructor(private commentService: CommentService) {}

    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        
    }

    @Get()
    getAll() {
        return 'comments'
    }

}