import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DataRequest } from '../interfaces/request.interface';
import { Client } from 'pg';
import { UserRepository } from './entities/users.entity';

@Injectable()
export class UsersService {
  request: any;
  userEntity: any;
  userRepo: UserRepository;
  constructor(
    @Inject(DatabaseModule.PG_POOL)
    private readonly db: Client,
  ) {
    this.userRepo = new UserRepository(db);
  }

  async getAllUser(): Promise<any> {
    try {
      const users = await this.userRepo.findAll(this.db);
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(request: DataRequest): Promise<any> {
    const data = await this.userRepo.createUser(request);
    try {
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id_user: string): Promise<any> {
    try {
      const data = await this.userRepo.findById(this.db, id_user);
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByUsername(name_user: string): Promise<any> {
    try {
      const data = await this.userRepo.findByName(this.db, name_user);
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(request: DataRequest): Promise<any> {
    try {
      const data = await this.userRepo.updateById(this.db, request);
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id_user: string): Promise<any> {
    try {
      const data = await this.userRepo.deleteUser(this.db, id_user);
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
