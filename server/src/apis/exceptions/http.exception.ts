export class HttpException extends Error {
  public status: string
  public message: string
  public errorCode: string

  constructor(status: string, message: string, errorCode: string) {
    super(message)
    this.status = status
    this.message = message
    this.errorCode = errorCode
  }
}
