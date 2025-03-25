import { CreateUserDto } from '../dto/user.dto'
import { UserEntity } from '../entities/user.entity'
import { AuthModel } from '../models/auth.model'
import { UserModel } from '../models/user.model'
import { hashPassword } from '../utils/hash.util'

export const AuthService = {
  create: async (userData: CreateUserDto) => {
    const hashedPassword = await hashPassword(userData.password)
    const user = new UserEntity({ ...userData, password: hashedPassword })
    const newUser = await AuthModel.createUserModel(user)

    return { user: newUser }
  },

  findOneUser: async <T>(tableName: string, condition: Record<string, any>): Promise<T | null> => {
    const user = await UserModel.findOne(tableName, condition)
    return user as T
  }
}
