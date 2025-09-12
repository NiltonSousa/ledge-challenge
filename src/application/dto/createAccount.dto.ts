import { IsString, IsEmail } from 'class-validator';

export class CreateAccountRequestDTO {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;
}
