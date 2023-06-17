import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Products } from './products/entities/product.entity';
import { AdministratorsModule } from './administrators/administrators.module';
import { Administrators } from './administrators/entities/administrator.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    ProductsModule,
    AdministratorsModule,
    AuthModule,
  ], // Import the DatabaseModule here
  controllers: [AppController],
  providers: [AppService, User, Products, Administrators],
})
export class AppModule {}
