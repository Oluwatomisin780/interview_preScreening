import { Post_Categories } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
  @ApiProperty({
    enum: ['KIDNEY', 'HEADACHE', 'STOMACHACHE', 'LEGPAIN', 'MALARIA'],
  })
  @IsNotEmpty()
  category: Post_Categories;
}
