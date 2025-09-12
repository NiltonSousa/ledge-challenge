import { Module } from '@nestjs/common';
import { AccountModule, MovimentModule } from './modules';

@Module({
  imports: [AccountModule, MovimentModule],
})
export class AppModule {}
