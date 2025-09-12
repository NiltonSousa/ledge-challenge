import { Module } from '@nestjs/common';
import { MovimentController } from '../controllers';
import { MovimentService } from '../services';

@Module({
  imports: [],
  controllers: [MovimentController],
  providers: [MovimentService],
})
export class MovimentModule {}
