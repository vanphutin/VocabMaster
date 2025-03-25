import { ERROR_CODES } from '../constants/error.constants'
import { HttpException } from './http.exception'

export class UsernameExistsException extends HttpException {
  constructor() {
    super('error', 'Username already exists', ERROR_CODES.USERNAME_EXISTS)
  }
}

export class EmailExistsException extends HttpException {
  constructor() {
    super('error', 'Email already exists', ERROR_CODES.EMAIL_EXISTS)
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('error', 'Unauthorized access', ERROR_CODES.UNAUTHORIZED)
  }
}
