import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { AccessEntity } from '../access/entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessEntity])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule { }
