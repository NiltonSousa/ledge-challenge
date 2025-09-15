import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovementRequestDTO } from '../dto';
import { Movement } from '@/domain';
import { MovementService } from '../services';

@Controller('movements')
export class MovementController {
  constructor(private readonly appService: MovementService) {}

  @Post()
  async createMovement(
    @Body() dto: CreateMovementRequestDTO,
  ): Promise<Movement> {
    return this.appService.createMovement(dto);
  }
}
