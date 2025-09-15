import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema, MovementSchema } from '@/infra/typeorm/schemas';
import { RabbitPublisher } from '@/infra/publisher/rabbit.publisher';
import { MovementService } from '../services';
import { MovementController } from '../controllers';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema, MovementSchema])],
  controllers: [MovementController],
  providers: [RabbitPublisher, MovementService],
})
export class MovementModule {}
