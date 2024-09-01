import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { Wish } from './entities/wish.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@AuthUser() user: User, @Body() dto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get('last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.findOne({
      where: { id: +id },
      relations: ['owner', 'offers', 'offers.user'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @AuthUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateWishDto,
  ): Promise<Wish> {
    return this.wishesService.update(+id, dto, +user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@AuthUser() user: User, @Param('id') id: string) {
    return this.wishesService.remove(+id, +user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copy(@AuthUser() user: User, @Param('id') id: string) {
    return this.wishesService.copy(+id, user);
  }
}
