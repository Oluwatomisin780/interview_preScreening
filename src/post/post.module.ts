import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [PostService, JwtStrategy],
  controllers: [PostController],
})
export class PostModule {}
