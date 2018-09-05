import { mod } from './utils'

export function getDay(year, month, date) {
  year = +year
  month = +month
  date = +date

  var c, y, m
  if (month === 1 || month === 2) {
    c = Math.floor((year - 1) / 100)
    y = (year - 1) % 100
    m = month + 12
  } else {
    c = Math.floor(year / 100)
    y = year % 100
    m = month
  }

  return mod(y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor(26 * (m + 1) / 10) + date - 1, 7)
}
