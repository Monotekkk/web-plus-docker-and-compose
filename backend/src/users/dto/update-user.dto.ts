import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'username',
  'email',
  'password',
]) {
  @ApiProperty({ example: 'exampleuser' })
  @IsString()
  @Length(1, 64)
  @IsOptional()
  username: string;

  @ApiProperty({ example: 'user@yandex.ru' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'somestrongpassword' })
  @Length(2)
  @IsOptional()
  password: string;
}
