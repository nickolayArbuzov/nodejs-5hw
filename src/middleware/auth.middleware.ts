import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Blogger } from '../blogger/blogger.entity'
import { Repository } from 'typeorm'
import { BloggerService } from '../blogger/blogger.service'



@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private blogService: BloggerService) {}
  async use(req: Request, res: Response, next: NextFunction) {

    if (!(req.headers?.authorization?.split(' ')[1] === new Buffer('admin:qwerty').toString('base64')) || !(req.headers?.authorization?.split(' ')[0] === 'Basic')){
      res.sendStatus(401)
    }
    else {
      next()
    }
  }
}