import { Controller, UseGuards, Get, Post, Body, Param, Query, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'; // 假设你已经创建了这个 DTO
import { Public } from '../common/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('b/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
//   @UseGuards(JwtAuthGuard) 加用户
  @Public()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
//   @Public() // 随便查用户
 @UseGuards(JwtAuthGuard)
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(':id')// 指定id查用户
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOneId(id);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  update(@Body() updateUserDto: CreateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  remove(@Body('id') id: string) {
    
    return this.userService.remove(id);
  }
}