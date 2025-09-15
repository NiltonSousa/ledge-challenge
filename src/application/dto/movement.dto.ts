import { IsNumber, IsString } from 'class-validator';

export class CreateMovementRequestDTO {
  @IsString()
  accountId: string;

  @IsNumber()
  amount: number;

  @IsString()
  type: string;

  @IsString()
  description: string;
}
