import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { request } from 'http';
import { DataRequest } from 'src/interfaces/request.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const user = await this.usersService.getAllUser();
      console.log('*********', user);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/create-user')
  async createUserInService(@Req() request: any): Promise<any> {
    const data = await this.usersService.createUserInService(request.body);
    return {
      message: 'Usuário criado com sucesso',
      ret: data,
    };
  }

  @Post('find-by-id')
  async findById(@Body() body: { id_user: string }): Promise<any> {
    console.log('***********', body.id_user);
    const data = await this.usersService.findById(body.id_user);
    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Post('find-by-name')
  async findByName(@Body() body: { name_user: string }): Promise<any> {
    const data = await this.usersService.findByName(body.name_user);
    if (!data) {
      throw new HttpException('Usuário não localizado', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Patch('update')
  async updateById(@Body() request: any): Promise<any> {
    const updatedUser = await this.usersService.updateById(request);
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  @Delete('delete-user')
  async deleteUser(@Body() request: DataRequest): Promise<any> {
    const { id_user } = request;
    const deletedUser = await this.usersService.deleteUser(id_user);
    console.log('>>>', request.body);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: `Usuário ${id_user} deletado com sucesso`,
      user: deletedUser.name_user,
    };
  }
}
