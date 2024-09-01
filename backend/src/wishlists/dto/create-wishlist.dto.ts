import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ example: 'Мой вишлист' })
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?img=3' })
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  @ApiProperty({ example: [1] })
  @IsNumber({}, { each: true })
  @IsOptional()
  itemsId: number[];
}
