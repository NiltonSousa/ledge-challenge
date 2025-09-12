import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountRequestDTO } from '../dto';
import { Account } from '@/domain';

@Controller('accounts')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post()
  createAccounts(@Body() dto: CreateAccountRequestDTO): Account {
    return this.appService.createAccounts(dto);
  }

  @Get(':id/balance')
  getAccountById(@Param('id') accountId: string): Account {
    return this.appService.getAccountById(accountId);
  }
}
