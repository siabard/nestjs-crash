import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    getUsers(): User[] {
        return this.usersService.findAll();
    }

    @ApiOkResponse({type: User})
    @Get(':id')
    getUserById(@Param("id") id: string): User {
        return this.usersService.findById(Number(id));
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.usersService.createUser(body);
    }
}
