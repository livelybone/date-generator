function isNonNegInt(num) {
  return +num === Math.floor(+num) && +num >= 0
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function getMonthLen(year, month) {
  year = +year
  month = +month

  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }

  return Math.ceil(Math.abs(month - 7.5)) % 2 === 1 ? 31 : 30
}

exports.isNonNegInt = isNonNegInt
exports.isLeapYear = isLeapYear
exports.getMonthLen = getMonthLen