import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUsersDto {
  @ApiProperty({ example: 'some@ya.ru' })
  @IsNotEmpty()
  @IsString()
  query: string;
}
