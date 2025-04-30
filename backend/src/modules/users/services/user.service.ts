import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../user.model';
import { Result } from '../../../common/result/result';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  
  async create(dto: CreateUserDto): Promise<Result<User>> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user: User = {
        id: dto.id,
        name: dto.name,
        email: dto.email,
        phoneNumber:dto.phoneNumber,
        password: hashedPassword,
      };

      const result = await this.userRepository.create(user);
      return result;
    } catch (error) {
      return Result.fail('Error creating user: ' + error.message);
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }
}
