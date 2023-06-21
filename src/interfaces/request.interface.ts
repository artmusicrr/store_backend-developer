import { Client } from 'pg';

export interface DataRequest {
  password: string;
  username: string;
  id_user: string;
  email_user: string;
  cpf_user: string;
  registration_date: string;
  updated_at: string;
  active: boolean;
  db: any;
  client: Client;
  body: any;
}
