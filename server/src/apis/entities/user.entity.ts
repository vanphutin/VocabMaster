import { v4 as uuidv4 } from 'uuid'

export class UserEntity {
  id: string
  username: string
  email: string
  password: string
  lastname: string
  firstname: string
  photo_url?: string | null
  provider?: string | null
  googleId?: string | null

  constructor(data: Partial<UserEntity>) {
    this.id = data.id ?? uuidv4()
    this.username = data.username || ''
    this.email = data.email || ''
    this.password = data.password || ''
    this.photo_url = data.photo_url || null
    this.provider = data.provider || 'local'
    this.lastname = data.lastname || ''
    this.firstname = data.firstname || ''
    this.googleId = data.googleId || ''
  }
}
