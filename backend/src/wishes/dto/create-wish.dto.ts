import { OmitType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';

export class CreateWishDto extends OmitType(WishDto, [
  'id',
  'createdAt',
  'updatedAt',
  'raised',
  'owner',
  'offers',
  'copied',
]) {}
