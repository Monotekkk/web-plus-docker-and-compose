import { OmitType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';

export class UpdateWishDto extends OmitType(WishDto, [
  'id',
  'createdAt',
  'updatedAt',
  'owner',
  'copied',
]) {}
