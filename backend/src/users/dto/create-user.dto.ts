import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'about',
  'avatar',
]) {
  @ApiProperty({ example: 'exampleuser' })
  @IsString()
  @Length(0, 200)
  @IsOptional()
  about: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?img=3' })
  @IsUrl()
  @Length(0, 200)
  @IsOptional()
  avatar: string;
}
