import { Application } from 'express'
import express from 'express'
import authRouter from './auth.router'

export default (app: Application) => {
  const router = express.Router()
  router.use('/auth', authRouter)
  app.use('/api/v1', router)
}
