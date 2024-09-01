import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/entities/user.entity';
@Controller('offers')
export class OffersController {
  constructor(private readonly OffersService: OffersService) {}

  @Post()
  create(user: User, @Body() offer: CreateOfferDto) {
    return this.OffersService.create(user, offer);
  }

  @Get()
  findAll() {
    return this.OffersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.OffersService.findOne(+id);
  }
}
