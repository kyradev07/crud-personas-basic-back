import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const user: User = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    const users: User[] = await this.userRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('No hay usuarios en la base de datos');
    }
    return users;
  }

  async findOne(id: number) {
    const user: User | null = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`No existe el usuario con id ${id}`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userDB: User | undefined = await this.userRepository.preload({
      id,
      ...updateUserDto
    });

    if (!userDB) {
      throw new NotFoundException(`No existe el usuario con id ${id}`);
    }

    return await this.userRepository.save(userDB);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
