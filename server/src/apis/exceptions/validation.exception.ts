import { HttpException } from './http.exception'

export class ValidationException extends HttpException {
  public errors: { field: string; message: string }[]

  constructor(errors: { field: string; message: string }[]) {
    super('error', 'Validation failed', 'VALIDATION_ERROR')
    this.errors = errors
  }
}
