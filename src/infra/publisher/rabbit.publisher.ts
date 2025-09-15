import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import amqp, {
  ChannelWrapper,
  AmqpConnectionManager,
} from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class RabbitPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitPublisher.name);
  private connection!: AmqpConnectionManager;
  private channel!: ChannelWrapper;

  async onModuleInit() {
    const url = process.env.AMQP_URL ?? 'amqp://admin:admin@localhost:5672';
    this.connection = amqp.connect([url], {
      heartbeatIntervalInSeconds: 10,
      reconnectTimeInSeconds: 5,
    });
    this.connection.on('connect', () => this.logger.log(`Connected to ${url}`));
    this.connection.on('disconnect', (e: any) =>
      this.logger.error(`Disconnected: ${e}`),
    );

    this.channel = this.connection.createChannel({
      json: true,
      setup: async (ch: Channel) => {
        await ch.assertQueue('movements_queue', { durable: true });
        this.logger.log('Queue asserted: movements_queue');
      },
    });

    await this.channel.waitForConnect();
    this.logger.log('Channel ready');
  }

  async publish(event: any, queue: string) {
    try {
      await this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(event)),
        { persistent: true, contentType: 'application/json' },
      );
      this.logger.debug(`Published ${JSON.stringify(event) ?? ''}`);
    } catch (err) {
      this.logger.error(`Publish failed: ${String(err)}`);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
