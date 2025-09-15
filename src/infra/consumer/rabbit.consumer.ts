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
import { Channel, ConsumeMessage } from 'amqplib';

export type MessageHandler = (
  data: any,
  raw: ConsumeMessage,
  ch: Channel,
) => Promise<void>;

@Injectable()
export class RabbitConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitConsumer.name);
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
        await ch.assertQueue('moviments_queue', { durable: true });
        this.logger.log('Queue asserted: moviments_queue');
      },
    });

    await this.channel.waitForConnect();
    this.logger.log('Channel ready');
  }

  async consume(handler: MessageHandler) {
    const queue = process.env.AMQP_QUEUE ?? 'moviments_queue';
    await this.channel.addSetup(async (ch: Channel) => {
      await ch.consume(
        queue,
        (msg) => {
          if (!msg) return;

          void (async () => {
            try {
              const data: unknown = JSON.parse(msg.content.toString());
              await handler(data, msg, ch);
              ch.ack(msg);
            } catch (err) {
              this.logger.error(`Handler error: ${String(err)}`);
              // NACK sem requeue para evitar loops; direcione a DLQ por policy/topologia
              ch.nack(msg, false, false);
            }
          })();
        },
        { noAck: false },
      );
      this.logger.log(`Consuming queue: ${queue}`);
    });
  }
  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
