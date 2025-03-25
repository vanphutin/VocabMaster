export const handleDbError = (error: any) => {
  console.error('Database Error:', error)
  throw new Error('Database operation failed')
}
