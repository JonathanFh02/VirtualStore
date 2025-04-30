import { Injectable } from '@nestjs/common';
import { UserModel, User  } from '../user.model';
import { Result } from '../../../common/result/result';

@Injectable()
export class UserRepository {
  
  async create(user: User): Promise<Result<User>> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return Result.ok(savedUser.toJSON() as User);
    } catch (error) {
      return Result.fail('Error creating user: ' + error.message);
    }
  }

  async findById(id: number): Promise<Result<User>> {
    try {
      const user = await UserModel.get(id);

      if (!user) {
        return Result.fail('User not found');
      }

      return Result.ok(user.toJSON() as User);
    } catch (error) {
      return Result.fail('Error finding user: ' + error.message);
    }
  }

  async findByEmail(email: string): Promise<Result<User>> {
    try {
      const users = await UserModel.scan('email').eq(email).exec();
      if (!users || users.length === 0) {
        return Result.fail('User not found');
      }

      return Result.ok(users[0].toJSON() as User);
    } catch (error) {
      return Result.fail('Error finding user by email: ' + error.message);
    }
  }
}
