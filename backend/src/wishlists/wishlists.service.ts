import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(user: User, dto: CreateWishlistDto): Promise<Wishlist> {
    const { name, image, itemsId } = dto;
    const wishes = itemsId.map((id) => ({ id } as Wish));

    const wishlist = this.wishlistsRepository.create({
      name,
      image,
      owner: user,
      description: '',
      items: wishes,
    });

    if (!wishlist) {
      throw new BadRequestException('Wishlist not created');
    }

    return this.wishlistsRepository.save(wishlist);
  }

  async findAll() {
    const wishlist = await this.wishlistsRepository.find({
      relations: ['owner', 'items'],
    });

    return wishlist;
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlists not found');
    }

    return wishlist;
  }

  async update(id: number, dto: UpdateWishlistDto, userId: number) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('You can update only your wishlist');
    }

    return this.wishlistsRepository.save({ ...dto, id });
  }

  async remove(id: number, userId: number) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('You can delete only your wishlist');
    }

    return this.wishlistsRepository.delete(id);
  }
}
