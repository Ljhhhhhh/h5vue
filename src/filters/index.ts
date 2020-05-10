import dayjs from 'dayjs'

export const unixToTime = (unix: number) => {
  return dayjs(unix).format('YYYY-MM-DD HH:mm:ss')
}

export const unixToDate = (unix: number) => {
  return dayjs(unix).format('YYYY-MM-DD')
}