import { Inject, Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { DatabaseModule } from 'src/database/database.module';
import { Administrators } from './entities/administrator.entity';
import { Client } from 'pg';

@Injectable()
export class AdministratorsService {
  constructor(
    @Inject(DatabaseModule.PG_POOL) private readonly client: Client,
    private readonly administrators: Administrators,
  ) {}

  create(createAdministratorDto: CreateAdministratorDto) {
    return 'This action adds a new administrator';
  }

  async findAll() {
    const admin = await this.administrators.findAll(this.client);
    console.log('==> service admin', admin);
    return admin;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
