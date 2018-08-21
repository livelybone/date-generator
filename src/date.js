var fillTo = require('./utils').fillTo
var parseDate = require('./utils').parseDate
var getDay = require('./week').getDay
var getMonthLen = require('./utils').getMonthLen
var isNonNegInt = require('./utils').isNonNegInt

function gntDate(year, month, options) {
  if (!isNonNegInt(year) || !isNonNegInt(month)) {
    throw new Error('Prop year and month must be a non-negative number')
  }

  year = +year
  month = +month

  var minD = options.min && parseDate(options.min)
  var maxD = options.max && parseDate(options.max)

  var incrementDate = 1
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
    var bool = true
    if (minD) {
      bool = year >= minD.year
        || (year < minD.year && month >= minD.month)
        || (year < minD.year && month < minD.month && date >= minD.date)
    }
    if (maxD) {
      bool = year <= maxD.year
        || (year > maxD.year && month <= maxD.month)
        || (year > maxD.year && month > maxD.month && date <= maxD.date)
    }

    return bool
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
        if (incrementDate === monthLen + 1) incrementDate = 1
        calendar[i][j] = {
          year: fillTo(4, nextMonth.year),
          month: fillTo(2, nextMonth.month),
          date: fillTo(2, incrementDate),
          isInThisMonth: false,
          canBeChose: canChose(nextMonth.year, nextMonth.month, incrementDate)
        }
      }
    }
  }

  return calendar
}

exports.gntDate = gntDate
