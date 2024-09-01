import { OmitType } from '@nestjs/swagger';
import { WishDto } from 'src/wishes/dto/wish.dto';

export class UserWishesDto extends OmitType(WishDto, ['owner']) {}
