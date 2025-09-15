import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController, MovimentController } from './controllers';
import { AccountService, MovimentService } from './services';
import { AccountSchema, MovimentSchema } from '@/infra/typeorm/schemas';
import { configDotenv } from 'dotenv';
import { RabbitPublisher } from '@/infra/publisher/rabbit';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([AccountSchema, MovimentSchema]),
  ],
  controllers: [AccountController, MovimentController],
  providers: [AccountService, MovimentService, RabbitPublisher],
})
export class AppModule {}
