import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/swagger';

export class SigninUserDto extends OmitType(UserDto, [
  'id',
  'about',
  'avatar',
  'email',
  'createdAt',
  'updatedAt',
]) {}
