import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DataRequest } from 'src/interfaces/request.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const user = await this.usersService.getAllUser();
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/create-user')
  async createUser(@Body() request: DataRequest): Promise<any> {
    try {
      const data = await this.usersService.createUser(request);
      console.log('xxxxxx', data);
      return {
        message: 'Usuário criado com sucesso',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findById(@Param('id') id_user: string): Promise<any> {
    try {
      const data = await this.usersService.getUserById(id_user);
      if (!data) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('username/:username')
  async findByName(@Param('username') username: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByUsername(username);
      if (!user) {
        throw new HttpException('Usuário não localizado', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id') id_user: string,
    @Body() request: DataRequest,
  ): Promise<any> {
    try {
      request.id_user = id_user;
      const updatedUser = await this.usersService.updateUser(request);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id_user: string): Promise<any> {
    try {
      const deletedUser = await this.usersService.deleteUser(id_user);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: `Usuário ${id_user} deletado com sucesso`,
        user: deletedUser.username,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
