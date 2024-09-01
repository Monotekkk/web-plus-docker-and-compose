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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { FindUsersDto } from './dto/find-users.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { UserWishesDto } from './dto/user-wishes.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  async findOne(@AuthUser() user: User): Promise<User> {
    const { id } = user;
    return this.usersService.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
      },
    });
  }

  @Patch('me')
  async update(@AuthUser() user: User, @Body() dto: UpdateUserDto) {
    const { id } = user;
    return this.usersService.updateOne(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@AuthUser() user: User, @Param('id') id: string) {
    const { id: userId } = user;
    return this.usersService.removeOne(+id, +userId);
  }

  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findOne({
      where: { username },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        about: true,
        avatar: true,
      },
    });
  }

  @Post('find')
  @HttpCode(200)
  findMany(@Body() dto: FindUsersDto): Promise<User | User[]> {
    const { query } = dto;
    return this.usersService.findMany(query);
  }

  @Get('me/wishes')
  async getOwnWishes(@AuthUser() user: User): Promise<Wish[]> {
    const { id } = user;
    const { wishes } = await this.usersService.findOne({
      where: { id },
      relations: {
        wishes: true,
      },
    });
    return wishes;
  }

  @Get(':username/wishes')
  async getPublicWishes(
    @Param('username') username: string,
  ): Promise<UserWishesDto[]> {
    const { wishes } = await this.usersService.findOne({
      where: { username },
      relations: {
        wishes: {
          owner: false,
        },
      },
    });
    return wishes;
  }
}
