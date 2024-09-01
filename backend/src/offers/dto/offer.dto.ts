import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

export class OfferDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  item: Wish;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;
}
