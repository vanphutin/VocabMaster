import { query } from './db'

export const UserModel = {
  findOne: async <T>(tableName: string, condition: Record<string, any>): Promise<T | null> => {
    const keys = Object.keys(condition)
    const values = Object.values(condition)
    const whereClause = keys.map((key) => `${key} = ?`).join(' AND ')
    const query_sql = `SELECT * FROM ${tableName} WHERE ${whereClause} LIMIT 1`

    const [rows] = await query(query_sql, values)

    if (!Array.isArray(rows) && rows) {
      return rows as T
    }

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as T
    }
    return null
  }
}
