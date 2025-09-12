import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountRequestDTO } from '../dto';
import { Account } from 'src/domain';

@Controller('accounts')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post()
  createAccounts(@Body() dto: CreateAccountRequestDTO): Account {
    return this.appService.createAccounts(dto);
  }
}
