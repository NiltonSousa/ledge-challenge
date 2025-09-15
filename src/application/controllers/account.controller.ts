import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import {
  CreateAccountRequestDTO,
  CreateAccountResponseDTO,
  GetAccountBalanceResponseDTO,
} from '../dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post()
  async createAccounts(
    @Body() dto: CreateAccountRequestDTO,
  ): Promise<CreateAccountResponseDTO> {
    return this.appService.createAccount(dto);
  }

  @Get(':id/balance')
  async getAccountById(
    @Param('id') accountId: string,
  ): Promise<GetAccountBalanceResponseDTO | null> {
    return this.appService.getAccountById(accountId);
  }
}
