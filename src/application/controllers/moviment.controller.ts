import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovimentRequestDTO } from '../dto';
import { Moviment } from 'src/domain';
import { MovimentService } from '../services';

@Controller('moviments')
export class MovimentController {
  constructor(private readonly appService: MovimentService) {}

  @Post()
  createAccounts(@Body() dto: CreateMovimentRequestDTO): Moviment {
    return this.appService.createMoviments(dto);
  }
}
