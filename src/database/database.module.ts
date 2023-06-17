import { Module } from '@nestjs/common';
import { Pool } from 'pg';

@Module({
  imports: [],
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: () => {
        return new Pool({
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        });
      },
    },
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {
  static PG_POOL = 'PG_POOL';
}
