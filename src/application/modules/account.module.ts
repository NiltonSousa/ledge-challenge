import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { AccountService } from '../services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from '@/infra/typeorm/schemas';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
