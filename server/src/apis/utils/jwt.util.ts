import jwt from 'jsonwebtoken'

const SECRET_KEY = String(process.env.JWT_SECRET)

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error: unknown) {
    return null
  }
}
