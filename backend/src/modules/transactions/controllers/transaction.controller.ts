import { Controller, Post, Get, Param, Body, BadRequestException } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const result = await this.transactionService.createTransaction(dto);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.transactionService.getTransaction(id);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
