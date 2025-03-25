import { validate } from 'class-validator'
import { CreateUserDto, GoogleAuthDto } from '../dto/user.dto'
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { EmailExistsException, UsernameExistsException } from '../exceptions/custom.exception'
import { successResponse } from '../exceptions/success.response'
import { ValidationException } from '../exceptions/validation.exception'
import passport from 'passport'
import { generateToken } from '../utils/jwt.util'
import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

export const register = async (req: Request, res: Response) => {
  const userData = Object.assign(new CreateUserDto(), req.body)
  const errors = await validate(userData)
  if (errors.length > 0) {
    const errorDetails = errors.map((err) => ({
      field: err.property,
      message: Object.values(err.constraints || {})[0]
    }))
    throw new ValidationException(errorDetails)
  }
  const usernameExists = await AuthService.findOneUser('users', { username: userData.username })
  if (usernameExists) {
    throw new UsernameExistsException()
  }
  const emailExists = await AuthService.findOneUser('users', { email: userData.email })
  if (emailExists) {
    throw new EmailExistsException()
  }

  const newUser = await AuthService.create(userData)
  successResponse(res, 201, 'User created successfully', newUser)
}

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
})

export const googleCallback = (req: Request, res: Response) => {
  passport.authenticate('google', async (err: Error | null, user: GoogleAuthDto | null) => {
    if (err || !user) {
      console.error('Authentication error:', err)
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`)
    }

    // Tạo JWT
    const token = await generateToken(user)
    // Lưu token vào HTTP Only Cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.redirect(`${process.env.FRONTEND_URL}`)
  })(req, res)
}

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' })
    }
    res.clearCookie('jwt')
    res.redirect('/')
  })
}
