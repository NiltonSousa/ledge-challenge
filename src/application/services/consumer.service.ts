import { LedgerLog } from '@/domain/ledger-log.entity';
import { RabbitConsumer } from '@/infra/consumer/rabbit.consumer';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(
    @InjectRepository(LedgerLog)
    private readonly ledgerLogRepo: Repository<LedgerLog>,
    private readonly consumer: RabbitConsumer,
  ) {}

  async onModuleInit() {
    await this.consumer.consume(async (data) => {
      const buf = Buffer.from(data);
      const jsonStr = buf.toString('utf8');
      const obj: unknown = JSON.parse(jsonStr);

      console.log('New message consumed', obj);

      const entity = this.ledgerLogRepo.create(
        LedgerLog.build(randomUUID(), jsonStr, 'PROCESSED'),
      );

      await this.ledgerLogRepo.save(entity);

      console.log('Ledger log saved');
    });
  }
}
