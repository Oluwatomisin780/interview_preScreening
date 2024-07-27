import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
