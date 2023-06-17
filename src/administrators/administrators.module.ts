import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Administrators } from './entities/administrator.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [AdministratorsController],
  providers: [AdministratorsService, Administrators],
})
export class AdministratorsModule {}
