import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { User } from './schema/user.schema';
import { ParseMongoIdPipe } from '../mongo/pipes/parse-mongo-id-pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseMongoIdPipe)
    id: string,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    this.userService.deleteUser(id);
  }
}
