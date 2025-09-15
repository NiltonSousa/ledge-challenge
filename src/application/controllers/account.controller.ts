import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountRequestDTO } from '../dto';
import { Account } from '@/domain';

@Controller('accounts')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post()
  async createAccounts(@Body() dto: CreateAccountRequestDTO): Promise<Account> {
    return this.appService.createAccount(dto);
  }

  @Get(':id/balance')
  async getAccountById(
    @Param('id') accountId: string,
  ): Promise<Account | null> {
    return this.appService.getAccountById(accountId);
  }
}
