import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema, MovimentSchema } from '@/infra/typeorm/schemas';
import { RabbitPublisher } from '@/infra/publisher/rabbit.publisher';
import { MovimentService } from '../services';
import { MovimentController } from '../controllers';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema, MovimentSchema])],
  controllers: [MovimentController],
  providers: [RabbitPublisher, MovimentService],
})
export class MovimentModule {}
