import { HttpException, HttpStatus } from '@nestjs/common';
import { Client } from 'pg';

export class Administrators {
  async findAll(db: Client): Promise<any> {
    try {
      const query = `
        SELECT
        * FROM administrators`;
      const dataAccess = await db.query(query);
      const res = dataAccess.rows;
      console.log('======', res);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
