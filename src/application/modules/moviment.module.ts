import { Module } from '@nestjs/common';
import { MovimentController } from '../controllers';
import { MovimentService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema, MovimentSchema } from '@/infra/typeorm/schemas';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema, MovimentSchema])],
  controllers: [MovimentController],
  providers: [MovimentService],
})
export class MovimentModule {}
