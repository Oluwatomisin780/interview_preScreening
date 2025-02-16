import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  @IsString()
  content: string;
}
