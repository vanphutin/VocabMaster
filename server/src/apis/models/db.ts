import pool from '../../config/db.conf'
import { handleDbError } from '../utils/db.util'

export const query = async (sql: string, values?: any[]) => {
  try {
    const result = await pool.execute(sql, values || [])
    const [rows] = result
    return Array.isArray(rows) ? rows : [rows]
  } catch (error) {
    handleDbError(error)
    throw error
  }
}
