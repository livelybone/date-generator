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
      arr.push(i < 10 ? '0' + i : i + '')
    }
    return arr
  }
}

exports.isNonNegInt = isNonNegInt
exports.isLeapYear = isLeapYear
exports.getMonthLen = getMonthLen
exports.getIntervalVal = getIntervalVal