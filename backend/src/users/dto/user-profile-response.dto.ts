import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserProfileResponseDto extends OmitType(UserDto, ['password']) {}
