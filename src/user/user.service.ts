import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import * as bcrpyt from 'bcryptjs';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  //create user
  async createUser(userDto: UserDto) {
    userDto.password = await bcrpyt.hash(userDto.password, 12);
    const user = await this.prismaService.user.create({
      data: {
        ...userDto,
      },
    });
    return user;
  }

  //findOneUser
  async findOne(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }
}
