import express, { Request, Response } from 'express'
import passport from 'passport'
import { register, googleAuth, googleCallback, logout } from '../controllers/auth.controller'

const router = express.Router()

router.post('/register', register)

// Route bắt đầu authentication
router.get('/google', googleAuth)

// Route callback sau khi Google xác thực
router.get('/google/callback', googleCallback)

// Route logout
router.get('/logout', logout)

router.get('/login', (req: Request, res: Response) => {
  res.status(401).json({ message: 'Login failed. Please try again.' })
})

export default router
