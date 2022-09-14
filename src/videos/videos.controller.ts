import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import {VideoService} from "./videos.service";
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';


@Controller('videos')
export class VideoController {

    constructor(private videoService: VideoService) {}
    @Get()
    getAll() {
        return this.videoService.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.videoService.findOne(id)
    }

    @Post()
    create(@Body() videoDto: CreateVideoDto) {
        return this.videoService.createVideo(videoDto);
    }

    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.videoService.deleteVideo(id)
    }

    @HttpCode(204)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() videoDto: UpdateVideoDto){
        return this.videoService.updateVideo(id, videoDto)
    }

}