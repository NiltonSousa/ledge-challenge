import { Module } from '@nestjs/common';
import { AccountModule, MovimentModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
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
  ],
})
export class AppModule {}
