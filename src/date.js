const getDay = require('./week').getDay;
var getMonthLen = require('./utils').getMonthLen
var isNonNegInt = require('./utils').isNonNegInt

function parseDate(date) {
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/

  if (!reg.test(date)) throw new Error('Prop date is invalid. The right example: 2018-05-01')

  var arr = date.match(reg)

  if (!arr) return null

  var dateObj = { year: arr[1], month: arr[2], date: arr[3] }

  if (dateObj.month > 12 || dateObj.month < 1 || dateObj.date < 1 || dateObj.date > getMonthLen(dateObj.year, dateObj.month)) return null

  return dateObj
}

function gntDate(year, month, minDate, maxDate) {
  if (!isNonNegInt(year) || !isNonNegInt(month)) {
    throw new Error('Prop year and month must be a non-negative number')
  }
  var minD = minDate && parseDate(minDate)
  var maxD = maxDate && parseDate(maxDate)

  var incrementDate = 1
  var firstDay = getDay(year, month, incrementDate)
  var fillDateLen = firstDay & 7

  var prevMonth = month - 1 < 1 ? { year: year - 1, month: 12 } : { year: year, month: month - 1 }
  var prevMonthLen = getMonthLen(prevMonth.year, prevMonth.month)
  var monthLen = getMonthLen(year, month)
  var nextMonth = month + 1 > 12 ? { year: year + 1, month: 1 } : { year: year, month: month + 1 }

  var lineLen = Math.ceil((monthLen + fillDateLen) / 7)

  var calendar = []

  var canChose = function (year, month, date) {
    let bool = true
    if (minD) {
      bool = year >= minD.year && month >= minD.month && date >= minD.date
    }
    if (maxD) {
      bool = year <= maxD.year && month <= maxD.month && date <= maxD.date
    }

    return bool
  }

  for (var i = 0; i < lineLen; i++) {
    calendar[i] = []

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < fillDateLen) {
        var d = prevMonthLen - fillDateLen + 1 + j
        calendar[i][j] = {
          year: prevMonth.year,
          month: prevMonth.month,
          date: d,
          isInThisMonth: false,
          canBeChose: canChose(prevMonth.year, prevMonth.month, d)
        }
        continue
      }
      if (incrementDate <= monthLen) {
        calendar[i][j] = {
          year: year,
          month: month,
          date: incrementDate,
          isInThisMonth: true,
          canBeChose: canChose(year, month, incrementDate)
        }
        incrementDate++
      } else {
        if (incrementDate === monthLen + 1) incrementDate = 1
        calendar[i][j] = {
          year: year,
          month: month + 1,
          date: incrementDate,
          isInThisMonth: false,
          canBeChose: canChose(nextMonth.year, nextMonth.month, incrementDate)
        }
      }
    }
  }

  return calendar
}

exports.gntDate = gntDate
