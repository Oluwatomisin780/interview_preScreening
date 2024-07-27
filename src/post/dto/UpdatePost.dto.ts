import { ApiProperty } from '@nestjs/swagger';
import { Post_Categories } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;
  category: Post_Categories;
}
