import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from '@/infra/typeorm/schemas';
import { AccountController } from '../controllers';
import { AccountService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
