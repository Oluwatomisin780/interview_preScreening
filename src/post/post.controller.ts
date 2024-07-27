import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { Post_Categories, User } from '@prisma/client';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { CommentDto } from './dto/comment.dto';
import internal from 'stream';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ReplyCommentDto } from './dto/reply.dto';

@ApiTags('Post')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({ summary: 'createPost' })
  @ApiBody({ type: CreatePostDto })
  @Post('/createpost')
  async createPost(@Body() post: CreatePostDto, @CurrentUser() user: any) {
    return this.postService.createPost(post, user.userId);
  }
  @ApiOperation({ summary: 'getAllPost' })
  @Get('/getAllPost')
  async getAllPost(@Query('category') category?: Post_Categories) {
    return this.postService.getAllPost(category);
  }

  //updatePsot
  @ApiOperation({ summary: 'updatePost' })
  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @Put('/update-post/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: any,
  ) {
    return this.postService.updatePost(updatePostDto, id, user.userId);
  }

  //deletePost
  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @ApiOperation({ summary: 'deletePost' })
  @Delete('/delete-post/:id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.postService.deletePost(id, user.userId);
  }

  // comment on Post
  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @ApiOperation({ summary: 'comment  on Post' })
  @Post('/:postId/comment')
  async commentOnPost(
    @Body() commentDto: CommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: any,
  ) {
    return this.postService.commentOnPost(commentDto, postId, user.userId);
  }

  // reply to coment/
  @ApiParam({
    name: 'commentId',
    description: 'The ID of the comment',
    example: 1,
  })
  @ApiBody({ type: ReplyCommentDto })
  @ApiOperation({ summary: 'reply to comment' })
  @Post('/:commentId/reply')
  async replyComment(
    @Body() replyCommentDto: ReplyCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.postService.replyToComment(replyCommentDto, commentId);
  }
  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @ApiOperation({ summary: 'upvotePost' })
  @Get('/:postId/up-vote-post')
  async upvotePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.upVotePost(postId);
  }

  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @ApiOperation({ summary: 'upvotePost' })
  @Get('/:postId/down-vote-post')
  async downvotePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.downVotePost(postId);
  }

  @ApiParam({
    name: 'postId',
    description: 'The ID of the post',
    example: 1,
  })
  @ApiOperation({ summary: 'get comment  under post ' })
  @Get('/:postId/comments')
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getAllCommentUnderPost(postId);
  }
}
