var fillTo = require('zero-fill')

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

function getIntervalVal(defaultMax) {
  return function (options) {
    options = Object.assign({}, { interval: 1, min: 0, max: defaultMax }, options)
    var reset = function (k) {
      if (!isNonNegInt(options[k])) {
        options[k] = Math.ceil(Math.abs(options[k]))
      }
    }
    reset('interval')
    reset('min')
    reset('max')

    var arr = []
    for (var i = options.min; i <= options.max && i <= defaultMax; i += options.interval) {
      arr.push(fillTo(2, i))
    }
    return arr
  }
}

function parseDate(date, type) {
  type = type === 'month' ? 'month' : 'date'
  var reg = /^(\d{4})-(\d{1,2})-?(\d{1,2})?$/

  if (!reg.test(date)) throw new Error('Utils.parseDate: Prop date is invalid. The right example: 2018-02[-01]')

  var arr = date.match(reg)

  if (!arr) return null

  var dateObj = { year: +arr[1], month: +arr[2], date: +arr[3] }

  if (dateObj.month > 12 || dateObj.month < 1
    || (type === 'date' && (dateObj.date < 1 || dateObj.date > getMonthLen(dateObj.year, dateObj.month)))) return null

  return dateObj
}

exports.isNonNegInt = isNonNegInt
exports.isLeapYear = isLeapYear
exports.getMonthLen = getMonthLen
exports.getIntervalVal = getIntervalVal
exports.parseDate = parseDate
exports.fillTo = fillTo
