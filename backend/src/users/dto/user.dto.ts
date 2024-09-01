import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'exampleuser' })
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'exampleuser' })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  about: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?img=3' })
  @IsUrl()
  @Length(0, 200)
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({ example: 'user@yandex.ru' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'somestrongpassword' })
  @Length(2)
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
