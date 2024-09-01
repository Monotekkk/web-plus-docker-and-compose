import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserPublicProfileResponseDto extends OmitType(UserDto, [
  'email',
  'password',
]) {}
