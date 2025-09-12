import { Module } from '@nestjs/common';
import { MovimentController } from '../controllers';
import { MovimentService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentSchema } from 'src/infra/typeorm/schemas';

@Module({
  imports: [TypeOrmModule.forFeature([MovimentSchema])],
  controllers: [MovimentController],
  providers: [MovimentService],
})
export class MovimentModule {}
