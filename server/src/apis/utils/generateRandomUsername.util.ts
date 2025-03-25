const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD') // Chuẩn hóa thành Unicode NFD
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\s+/g, '') // Loại bỏ khoảng trắng
}

export const generateRandomUsername = (firstName: string, lastName: string): string => {
  const cleanFirstName = removeVietnameseTones(firstName).toLowerCase()
  const cleanLastName = removeVietnameseTones(lastName).toLowerCase()
  const randomNumber = Math.floor(1000 + Math.random() * 9000) // 4 chữ số ngẫu nhiên
  return `${cleanFirstName}${cleanLastName}${randomNumber}`
}
