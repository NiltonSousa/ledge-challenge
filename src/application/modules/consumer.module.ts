import { Module } from '@nestjs/common';
import { RabbitConsumer } from '@/infra/consumer/rabbit.consumer';
import { ConsumerService } from '../services/consumer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerLogSchema } from '@/infra/typeorm/schemas';

@Module({
  imports: [TypeOrmModule.forFeature([LedgerLogSchema])],
  providers: [RabbitConsumer, ConsumerService],
})
export class LogConsumerModule {}
