/**
 * 날짜를 yy.mm.dd 형식으로 변환
 */
export function formatDate(dateString) {
  if (!dateString) return dateString

  try {
    if (dateString.includes('-')) {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear().toString().slice(-2)
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}.${month}.${day}`
      }
    }
    return dateString
  } catch (error) {
    return dateString
  }
}
