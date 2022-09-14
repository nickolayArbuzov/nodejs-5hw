import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {AllDataService} from "./all-data.service";


@Controller('testing')
export class AllDataController {

    constructor(private allDataService: AllDataService) {}

    @Delete('all-data')
    @HttpCode(204)
    delete(){
       this.allDataService.deleteAllData()
    }

}