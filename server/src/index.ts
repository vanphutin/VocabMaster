import dotenv from 'dotenv'
import morgan from 'morgan'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

import './config/passport.config'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import database from './config/db.conf'
import routerApp from './apis/routes/index.router'
import { errorHandler } from './apis/middlewares/error.middleware'
import passport from 'passport'

const PORT: number = Number(process.env.PORT) || 5000
const app: Application = express()

// morgan
app.use(morgan('combined'))

// Middleware requestLogger

// Cấu hình CORS
const whitelist: string[] = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5173']

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`), false)
    }
  }
}

app.use(cors(corsOptions))

// Middleware xử lý JSON và URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

// router app
routerApp(app)

// Kiểm tra server
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!')
})

// Kết nối Database & khởi động server
async function startServer() {
  try {
    // Lấy kết nối từ pool
    const connection = await database.getConnection()
    console.log(`✅ Kết nối MySQL thành công! Host: ${connection.config.host}, Port: ${connection.config.port}`)

    // Trả kết nối về pool
    connection.release()

    // Khởi động server sau khi kết nối thành công
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy trên port ${PORT} | Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error: any) {
    console.error('❌ Lỗi kết nối database:', error.message)
    process.exit(1)
  }
}
// Middleware xử lý lỗi
app.use(errorHandler)

// Gọi hàm khởi động server
startServer()
