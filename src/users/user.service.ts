import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { QueryUserDto } from 'src/commonDTO/query.dto';
import { queryDefault } from '../constants/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: QueryUserDto) {
    const repo = this.userRepository.createQueryBuilder('user')

    //TODO: add bybass query-obj(helper)
    if(query.searchEmailTerm && !query.searchLoginTerm) {
      repo.where("LOWER(user.email) like :email", { email: `%${query.searchEmailTerm.toLowerCase()}%` })
    }
    if(!query.searchEmailTerm && query.searchLoginTerm) {
      repo.where("LOWER(user.login) like :login", { login: `%${query.searchLoginTerm.toLowerCase()}%` })
    }
    if(query.searchEmailTerm && query.searchLoginTerm) {
      repo.where("LOWER(user.email) like :email", { email: `%${query.searchEmailTerm.toLowerCase()}%` })
      repo.orWhere("LOWER(user.login) like :login", { login: `%${query.searchLoginTerm.toLowerCase()}%` })
    }
    
    const sortDirection = (query.sortDirection ? query.sortDirection.toLocaleUpperCase() : queryDefault.sortDirection.toLocaleUpperCase()) as 'DESC' | 'ASC'

    const all = await repo
      .skip((query.pageNumber ? (+query.pageNumber-1) : (+queryDefault.pageNumber-1)) * (query.pageSize ? + +query.pageSize : +queryDefault.pageSize))
      .take(query.pageSize ? +query.pageSize : +queryDefault.pageSize)
      .orderBy(`user.${query.sortBy ? query.sortBy : queryDefault.sortBy}`, sortDirection)
      .getMany()

    const count = await repo.getCount()
    //TODO: automapper
    //TODO: property order in returned obj's
    const returnedUsers = all.map(a => {return {createdAt: a.createdAt, email: a.email, id: a.id, login: a.login}})
    return {
      pagesCount: Math.ceil(count/(query.pageSize ? + +query.pageSize : +queryDefault.pageSize)), 
      page: query.pageNumber ? +query.pageNumber : +queryDefault.pageNumber, 
      pageSize: query.pageSize ? +query.pageSize : +queryDefault.pageSize, 
      totalCount: count, 
      // скорее всего связано с различной сортировкой в js и postgresql
      items: query.sortBy === 'login' ? returnedUsers.sort((a,b) => a.login > b.login && sortDirection === 'ASC' ? 1 : -1 ) : returnedUsers
    }
    
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new User()
    newUser.login = dto.login
    newUser.password = dto.password
    newUser.email = dto.email
    let date = new Date
    newUser.createdAt = date.toISOString()
    const user = await this.userRepository.insert(newUser);
    return {
      createdAt: newUser.createdAt,
      email: newUser.email,
      id: newUser.id,
      login: newUser.login,
    }
  }

  async deleteUser(id: string){
    const donorUser = await this.userRepository.findOne({where: {id: id}});
    if(donorUser) {
      await this.userRepository.delete(id)
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}