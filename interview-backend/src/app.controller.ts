import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { City } from './interface';

@Controller('cities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCities(
    @Query('query') query: string,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<{ data: City[]; totalPages: number; totalCities: number }> {
    return this.appService.getCities(query, page);
  }
}
