import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseModule } from 'src/database/database.module';
import { Products } from './entities/product.entity';
import { Client } from 'pg';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DatabaseModule.PG_POOL) private readonly client: Client,
    private readonly products: Products,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    const result = await this.products.findAll(this.client);
    console.log('==>Result', result);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
