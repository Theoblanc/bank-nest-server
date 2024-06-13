import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCommandDto } from '@/create-command.handler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto) {
    return this.appService.create(createCommandDto);
  }
}
