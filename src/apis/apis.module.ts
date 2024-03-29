import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from './entities/api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Api])],
  controllers: [ApisController],
  providers: [ApisService],
})
export class ApisModule {}
