import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/http.exception'
import { ValidationException } from '../exceptions/validation.exception'

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  if (err instanceof ValidationException) {
    res.status(400).json({
      status: err.status,
      message: err.message,
      errors: err.errors
    })
  } else if (err instanceof HttpException) {
    res.status(400).json({
      status: err.status,
      message: err.message,
      errorCode: err.errorCode
    })
  } else {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}
