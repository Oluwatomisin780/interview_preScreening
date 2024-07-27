import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'create user' })
  async createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@CurrentUser() user: UserDto) {
    console.log(user);
  }
}
