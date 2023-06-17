import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DataRequest } from '../interfaces/request.interface';
import { Client } from 'pg';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  request: any;
  userEntity: any;
  constructor(
    @Inject(DatabaseModule.PG_POOL)
    private readonly db: Client,
  ) {}

  async getAllUser(): Promise<any> {
    console.log('xxxxxx');
    try {
      const user = new User();
      const resp = await user.findAll(this.db);
      return resp;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createUserInService(request: DataRequest): Promise<any> {
    console.log('<==>', request.body);
    try {
      const res = await new User().createUserInService(this.db, request);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id_user: string): Promise<any> {
    try {
      const user = new User();
      const resp = await user.findById(this.db, id_user);
      console.log('xxxxxx', resp);
      return resp;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByName(name_user: string): Promise<any> {
    try {
      const user = new User();
      const resp = await user.findByName(this.db, name_user);
      console.log('xxxxxx', resp);
      return resp;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateById(request: DataRequest): Promise<any> {
    try {
      const user = new User();
      const data = await user.updateById(this.db, request);
      console.log('xxxxxx', data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id_user: string): Promise<any> {
    try {
      const user = new User();
      const deleteUser = await user.deleteUser(this.db, id_user);
      console.log('xxxxxx', deleteUser);
      return deleteUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
