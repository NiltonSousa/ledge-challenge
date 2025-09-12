import { NestFactory } from '@nestjs/core';
import { AccountModule } from './application/modules/account.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  await app.listen(3000);
}

void bootstrap();
