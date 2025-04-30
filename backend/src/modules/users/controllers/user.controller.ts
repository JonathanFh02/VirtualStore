import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Result } from '../../../common/result/result';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto):Promise<Result<any>> {
      return this.userService.create(dto);
    }
    
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findById(id);
    }
}
