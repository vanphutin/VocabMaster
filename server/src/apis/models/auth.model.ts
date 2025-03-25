import { UserEntity } from '../entities/user.entity'
import { query } from './db'

export const AuthModel = {
  createUserModel: async (user: UserEntity) => {
    return await query(
      'INSERT INTO users (id, username, lastname, firstname, email, password, photo_url, provider, googleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user.id,
        user.username,
        user.lastname,
        user.firstname,
        user.email,
        user.password,
        user.photo_url,
        user.provider,
        user.googleId
      ]
    )
  }
}
