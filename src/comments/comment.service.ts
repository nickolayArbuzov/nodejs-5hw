import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(dto: CreateCommentDto) {
    const comment = await this.commentRepository.create(dto);
    return comment;
}

  async findAll() {
    return this.commentRepository.find();
  }
}