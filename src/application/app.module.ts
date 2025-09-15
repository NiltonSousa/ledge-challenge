import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { LogConsumerModule } from './modules/consumer.module';
import { AccountModule } from './modules/account.module';
import { MovimentModule } from './modules/moviment.module';

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
    AccountModule,
    MovimentModule,
    LogConsumerModule,
  ],
})
export class AppModule {}
