import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { CommentDto } from './dto/comment.dto';
import { Post_Categories, Prisma } from '@prisma/client';
import { GetPostParams } from './dto/getPostParams';
import { ReplyCommentDto } from './dto/reply.dto';
@Injectable()
export class PostService {
  constructor(private prismaservice: PrismaService) {}

  async createPost(createPostDto: CreatePostDto, userId: number) {
    return this.prismaservice.post.create({
      data: {
        ...createPostDto,
        userId,
      },
    });
  }
  //getallPost
  async getAllPost(filter?: Post_Categories) {
    return this.prismaservice.post.findMany({
      include: {
        user: true,
      },

      where: {
        category: filter,
      },
    });
  }

  async updatePost(updatePost: UpdatePostDto, id: number, userId: number) {
    const post = await this.prismaservice.post.update({
      where: {
        id,
      },
      data: {
        ...updatePost,
      },
    });

    if (post.userId !== userId) {
      throw new UnauthorizedException('User not Authorized');
    }
    return post;
  }

  async deletePost(id: number, userId: number) {
    const post = await this.prismaservice.post.delete({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException('User not Authorized');
    }

    return {
      message: 'post deleted Successfully',
    };
  }

  async commentOnPost(commentDto: CommentDto, postId: number, userId: number) {
    const comment = await this.prismaservice.comment.create({
      data: {
        ...commentDto,
        postId,
        userId,
      },
    });
    return comment;
  }

  // devotePost
  async downVotePost(postId: number) {
    const post = await this.prismaservice.post.update({
      where: {
        id: postId,
      },
      data: {
        downVoteCount: { increment: 1 },
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  //upVote
  async upVotePost(postId: number) {
    const post = await this.prismaservice.post.update({
      where: {
        id: postId,
      },
      data: {
        upVoteCount: { increment: 1 },
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  //reply to comment
  async replyToComment(replyCommentDto: ReplyCommentDto, commentId: number) {
    const post = await this.prismaservice.reply.create({
      data: {
        ...replyCommentDto,
        commentId,
      },
      include: {
        comment: true,
      },
    });
    return post;
  }

  //getAllCemment
  async getAllCommentUnderPost(postId: number) {
    const comments = await this.prismaservice.comment.findMany({
      where: { postId },
    });
    return comments;
  }
}
