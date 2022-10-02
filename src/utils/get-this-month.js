import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
// import 'dayjs/locale/zh-cn' // ES 2015

dayjs.locale('zh-cn') // 全局使用
dayjs().locale('zh-cn').format()
export const getCurrentMonth = function() {
  var first = new Date()
  first.setDate(1)
  first = dayjs(first).format('YYYY-MM-DD 00:00:00')
  var dateNow = new Date()
  dateNow = dayjs(dateNow).format('YYYY-MM-DD HH:mm:ss')
  return {
    start: first,
    end: dateNow
  }
}
export const getCurrentMonthFormat = function() {
  var first = new Date()
  first.setDate(1)
  first = dayjs(first).format('YYYY-MM-DD')
  var dateNow = new Date()
  dateNow = dayjs(dateNow).format('YYYY-MM-DD')
  console.log(first, dateNow)
  return {
    start: first,
    end: dateNow
  }
}
export const getCurrentWeek = function() {
  var now = new Date()
  const nowWeek = now.getDay() + 1
  var num = +new Date() - 1000 * 60 * 60 * 24 * nowWeek
  const startTime = new Date(num)
  const end = dayjs(now).format('YYYY-MM-DD')
  const start = dayjs(startTime).format('YYYY-MM-DD')
  return {
    start,
    end
  }
}
export const getCurrentWeekFormat = function() {
  var now = new Date()
  const nowWeek = now.getDay() + 1
  var num = +new Date() - 1000 * 60 * 60 * 24 * nowWeek
  const startTime = new Date(num)
  const end = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
  const start = dayjs(startTime).format('YYYY-MM-DD 00:00:00')
  return {
    start,
    end
  }
}
