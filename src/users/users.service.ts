import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
        {id: 0, name: "Yeonho"}
    ];

    public findAll(name?: string): User[] {
        if (name) {
            return this.users.filter(user => user.name === name);
        }
        return this.users;
    }

    public findById(userId: number): User {

        const user = this.users.find(user => user.id === userId);

        if (!user) {
            throw new NotFoundException('No user found');
        }

        return user;
    }

    public createUser(createUserDto: CreateUserDto): User {
        const newUser: User = {id: Date.now(), ...createUserDto};

        this.users.push(newUser);

        return newUser;
    }
}
