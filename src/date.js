import { getDay } from './index'
import { fillTo, getMonthLen, isNonNegInt, objAssign, parseDate } from './utils'

export function gntDate(year, month, options) {
  if (!isNonNegInt(year) || !isNonNegInt(month)) {
    throw new Error('Prop year and month must be a non-negative number')
  }

  year = +year
  month = +month

  var minD = objAssign({ year: 0, month: 0, date: 0 }, options.min && parseDate(options.min))
  var maxD = objAssign({ year: Infinity, month: Infinity, date: Infinity },
    options.max && parseDate(options.max))

  var incrementDate = 1
  var nextIncrementDate = 1
  var firstDay = getDay(year, month, incrementDate)
  var fillDateLen = firstDay & 7
  fillDateLen = fillDateLen === 0 ? 7 : fillDateLen

  var prevMonth = month - 1 < 1 ? { year: year - 1, month: 12 } : { year: year, month: month - 1 }
  var prevMonthLen = getMonthLen(prevMonth.year, prevMonth.month)
  var monthLen = getMonthLen(year, month)
  var nextMonth = month + 1 > 12 ? { year: year + 1, month: 1 } : { year: year, month: month + 1 }

  var lineLen = Math.ceil(31 / 7) + 1

  var calendar = []

  var canChose = function (year, month, date) {
    var compare = function (t, flag) {
      flag = flag || 1
      return (year - t.year) * flag > 0
        || (year === t.year && (month - t.month) * flag > 0)
        || (year === t.year && month === t.month && (date - t.date) * flag >= 0)
    }
    return compare(minD) && compare(maxD, -1)
  }

  for (var i = 0; i < lineLen; i++) {
    calendar[i] = []

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < fillDateLen) {
        var d = prevMonthLen - fillDateLen + 1 + j
        calendar[i][j] = {
          year: fillTo(4, prevMonth.year),
          month: fillTo(2, prevMonth.month),
          date: fillTo(2, d),
          isInThisMonth: false,
          canBeChose: canChose(prevMonth.year, prevMonth.month, d)
        }
        continue
      }
      if (incrementDate <= monthLen) {
        calendar[i][j] = {
          year: fillTo(4, year),
          month: fillTo(2, month),
          date: fillTo(2, incrementDate),
          isInThisMonth: true,
          canBeChose: canChose(year, month, incrementDate)
        }
        incrementDate++
      } else {
        calendar[i][j] = {
          year: fillTo(4, nextMonth.year),
          month: fillTo(2, nextMonth.month),
          date: fillTo(2, nextIncrementDate),
          isInThisMonth: false,
          canBeChose: canChose(nextMonth.year, nextMonth.month, nextIncrementDate)
        }
        nextIncrementDate++
      }
    }
  }

  return calendar
}
