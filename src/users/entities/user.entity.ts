import { HttpException, HttpStatus } from '@nestjs/common';
import { Client } from 'pg';
import { DataRequest } from '../../interfaces/request.interface';

export class User {
  request: DataRequest;
  db: any;

  async createUserInService(db: Client, request: DataRequest): Promise<void> {
    try {
      //const id_user = uuidv4();
      const query = `
        INSERT INTO public.users (name_user, email_user, cpf_user, password_user, registration_date, active)
        VALUES ($1, $2, $3, $4, NOW(), true);`;
      const values = [
        request.name_user,
        request.email_user,
        request.cpf_user,
        request.password_user,
      ];
      await db.query(query, values);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(db: Client): Promise<any> {
    try {
      const query = `
       SELECT id_user, name_user, email_user, cpf_user, password_user, registration_date, active
	     FROM public.users;`;
      const dataAccess = await db.query(query);
      const res = dataAccess.rows;
      console.log('======', res);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(db: Client, id_user: string): Promise<any> {
    try {
      const query = `
      SELECT * FROM public.users WHERE id_user = $1`;
      const values = [id_user];
      console.log(`===> ${id_user}`);
      const result = await db.query(query, values);
      console.log('res==>>> ', result.rows, values);
      return result.rows[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByName(db: Client, name_user: string): Promise<any> {
    try {
      const query = `
      SELECT * FROM public.users where name_user = '${name_user}';`;
      //const values = [name_user];
      const result = await db.query(query);
      console.log('======', result);
      return result.rows[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateById(db: Client, request: DataRequest): Promise<any> {
    try {
      const query = `
      UPDATE public.users
      SET name_user = $1, email_user = $2, cpf_user = $3, password_user = $4
      WHERE id_user = $5
      RETURNING id_user, name_user, email_user, cpf_user, password_user, registration_date, active;`;
      const values = [
        request.name_user,
        request.email_user,
        request.cpf_user,
        request.password_user,
        request.id_user,
      ];
      const dataAccess = await db.query(query, values);
      const res = dataAccess.rows[0];
      console.log('===xx===', res);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(db: Client, id_user: string): Promise<any> {
    try {
      const query = `SELECT * FROM public.users WHERE id_user = $1;`;
      const data = await db.query(query, [id_user]);
      const userToDelete = data.rows[0];

      if (!userToDelete) {
        throw new HttpException(
          `id_user ${id_user} inexistente`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deleteQuery = `DELETE FROM public.users WHERE id_user = $1;`;
      await db.query(deleteQuery, [id_user]);

      return {
        message: `Usuário $1 deletado com sucesso`,
        user: userToDelete.name_user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
