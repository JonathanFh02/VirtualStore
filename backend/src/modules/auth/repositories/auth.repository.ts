import { Injectable } from '@nestjs/common';
import { AuthModel, Auth } from '../auth.model';
import { Result } from '../../../common/result/result';

@Injectable()
export class AuthRepository {

  async findByUserId(userId: number): Promise<Result<Auth>> {
    console.log('findByUserId recibe:', userId);
    try {
      const users = await AuthModel.query('userId').eq(userId).exec();
      const user = users[0];
      if (!user) return Result.fail('Usuario no encontrado');
      return Result.ok(user.toJSON() as Auth);
    } catch (error) {
      return Result.fail('Error al buscar usuario: ' + error.message);
    }
  }


}