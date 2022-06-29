import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepositoty: Repository<User>,
  ) {}

  findAll(name?: string): Promise<User[]> {
    if (name) {
      return this.usersRepositoty.find({ where: { name } });
    }
    return this.usersRepositoty.find();
  }

  async findById(userId: number): Promise<User> {
    try {
      const user = await this.usersRepositoty.findOne({
        where: { id: userId },
      });
      return user;
    } catch (err) {
      // handle error
      throw err;
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.usersRepositoty.findOne({
        where: { username: username },
      });
      return user;
    } catch (err) {
      // handle error
      throw err;
    }
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepositoty.create({
      ...createUserDto,
    });

    return this.usersRepositoty.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    user.name = updateUserDto.name;

    return this.usersRepositoty.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findById(id);

    return this.usersRepositoty.remove(user);
  }
}
