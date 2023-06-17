import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, User],
})
export class UsersModule {}
