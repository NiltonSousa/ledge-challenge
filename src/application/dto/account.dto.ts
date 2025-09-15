import { IsString, IsEmail } from 'class-validator';

export class CreateAccountRequestDTO {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;
}

export interface CreateAccountResponseDTO {
  accountId: string;
}

export interface GetAccountBalanceResponseDTO {
  accountId: string;
  balance: number;
  availableLimit: number;
}
