import fillTo from 'zero-fill'

export { fillTo }

/**
 * @param {Integer} num
 * @return {Boolean}
 * */
export function isNonNegInt(num) {
  return +num === Math.floor(+num) && +num >= 0
}

/**
 * @param {Object} o1
 * @param {Object} o2
 * @return {Object}
 * */
export function objAssign(o1, o2) {
  o1 = typeof o1 === 'object' ? o1 : {}
  o2 = typeof o2 === 'object' ? o2 : {}
  return Object.keys(o1).concat(Object.keys(o2)).reduce(function (pre, k) {
    if (!(k in pre)) pre[k] = o2[k] !== undefined ? o2[k] : o1[k]
    return pre
  }, {})
}

/**
 * @param {Number} val
 * @param {Number} div
 * @return {Number}
 * */
export function mod(val, div) {
  return (val % div + div) % div
}

/**
 * @param {Number|String} year
 * @return {Boolean}
 * */
export function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

/**
 * @param {Integer} year
 * @param {Integer} month
 * @return {Integer}
 * */
export function getMonthLen(year, month) {
  year = +year
  month = +month

  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }

  return Math.ceil(Math.abs(month - 7.5)) % 2 === 1 ? 31 : 30
}

/**
 * @param {Integer} defaultMax
 * */
export function getIntervalVal(defaultMax) {
  /**
   * @param {Object<{interval: Integer, min: Integer, max: Integer}>} options
   * */
  return function (options) {
    options = objAssign({ interval: 1, min: 0, max: defaultMax - 1 }, options)
    var reset = function (k) {
      if (!isNonNegInt(options[k])) {
        options[k] = Math.ceil(Math.abs(options[k]))
      }
    }
    reset('interval')
    reset('min')
    reset('max')

    var arr = []
    for (var i = 0; i < defaultMax; i += options.interval) {
      arr.push({
        value: fillTo(2, i),
        max: defaultMax,
        canBeChose: i >= options.min && i <= options.max,
      })
    }
    return arr
  }
}

/**
 * @param {String} date, format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * @return {Object<{year: Integer, month: Integer, date: Integer}>}
 * */
export function parseDate(date) {
  var reg = /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/

  if (!reg.test(date)) throw new Error('Utils.parseDate: Param date is invalid. The right example: 2018[-02][-01]')

  var arr = date.match(reg)

  if (!arr) return null

  var dateObj = { year: +arr[1], month: mod(+arr[2] || 1, 13) }

  dateObj.date = mod(+arr[3] || 1, getMonthLen(dateObj.year, dateObj.month) + 1)

  return dateObj
}

/**
 * @param {String} time, format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * @return {Object<{hour: Integer, minute: Integer, second: Integer}>}
 * */
export function parseTime(time) {
  var reg = /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/

  if (!reg.test(time)) throw new Error('Utils.parseDate: Param time is invalid. The right example: 18[:02][:01]')

  var arr = time.match(reg)

  if (!arr) return null

  return { hour: mod(+arr[1], 24), minute: mod(+arr[2] || 0, 60), second: mod(+arr[3] || 0, 60) }
}