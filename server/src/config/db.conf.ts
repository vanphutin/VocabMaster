import mysql, { Pool } from 'mysql2/promise'
import config from './config'

const pool: Pool = mysql.createPool({
  queueLimit: 10,
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.pass,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10
})
const promisePool = pool

export default promisePool
