import { getMonthByStep } from './month'
import {
  DateCompare,
  DateInfo,
  DateInfoBase,
  DateInfoBase1,
  DateStr,
  GntCalendarOptions,
  Integer,
  IntegerStr,
} from './types'
import {
  fillTo,
  getMonthLen,
  isLeapYear,
  isNonNegInt,
  parseDate,
} from './utils'
import { getDay } from './week'

export function nowDate(): DateInfoBase {
  const now = new Date()
  return {
    year: fillTo(4, now.getFullYear()),
    month: fillTo(2, now.getMonth() + 1),
    date: fillTo(2, now.getDate()),
  }
}

export function compareDates(
  date1: DateInfoBase1 | DateStr,
  date2: DateInfoBase1 | DateStr,
) {
  const $date1 = typeof date1 === 'string' ? parseDate(date1) : date1
  const $date2 = typeof date2 === 'string' ? parseDate(date2) : date2
  if (!$date1 || !$date2) return DateCompare.Equal
  let diff = +$date1.year - +$date2.year
  if (diff)
    return diff > 0 ? DateCompare.GreatThanYear : DateCompare.LessThanYear
  diff = +$date1.month - +$date2.month
  if (diff)
    return diff > 0 ? DateCompare.GreatThanMonth : DateCompare.LessThanMonth
  diff = +$date1.date - +$date2.date
  if (diff)
    return diff > 0 ? DateCompare.GreatThanDate : DateCompare.LessThanDate
  return DateCompare.Equal
}

export function calcStepBetweenDates(
  date1: DateInfoBase1 | DateStr,
  date2: DateInfoBase1 | DateStr,
): number {
  const $date1 = typeof date1 === 'string' ? parseDate(date1) : date1
  const $date2 = typeof date2 === 'string' ? parseDate(date2) : date2
  if (!$date1 || !$date2) return 0
  const sorted = [$date1, $date2].sort(compareDates)

  const yearStep = +sorted[1].year - +sorted[0].year
  if (yearStep > 1) {
    return (
      new Array(yearStep)
        .join(',')
        .split(',')
        .reduce((pre, v, i) => {
          const year = +sorted[0].year + i + 1
          return pre + (isLeapYear(year) ? 366 : 365)
        }, 0) +
      calcStepBetweenDates(sorted[0], { ...sorted[0], month: 12, date: 31 }) +
      calcStepBetweenDates({ ...sorted[1], month: 1, date: 1 }, sorted[1])
    )
  }

  if (yearStep === 1) {
    return (
      calcStepBetweenDates(sorted[0], { ...sorted[0], month: 12, date: 31 }) +
      calcStepBetweenDates({ ...sorted[1], month: 1, date: 1 }, sorted[1])
    )
  }

  const monthStep = +sorted[1].month - +sorted[0].month
  if (monthStep > 1) {
    return (
      new Array(monthStep)
        .join(',')
        .split(',')
        .reduce((pre, v, i) => {
          const month = +sorted[0].month + i + 1
          return pre + getMonthLen(sorted[0].year, month)
        }, 0) +
      calcStepBetweenDates(sorted[0], { ...sorted[0], date: 31 }) +
      calcStepBetweenDates({ ...sorted[1], date: 1 }, sorted[1])
    )
  }
  if (monthStep === 1) {
    return (
      calcStepBetweenDates(sorted[0], { ...sorted[0], date: 31 }) +
      calcStepBetweenDates({ ...sorted[1], date: 1 }, sorted[1])
    )
  }

  return +sorted[1].month - +sorted[0].month
}

export function gntCalendar(
  monthInfo: { year: IntegerStr; month: IntegerStr } | DateStr,
  options?: GntCalendarOptions,
): typeof monthInfo extends DateStr ? DateInfo[][] | null : DateInfo[][] {
  const $monthInfo =
    typeof monthInfo === 'string' ? parseDate(monthInfo) : monthInfo
  if (!$monthInfo) return null as any
  const year = +$monthInfo.year
  const month = +$monthInfo.month
  options = options || {}

  if (!isNonNegInt(year) || !isNonNegInt(month)) {
    throw new Error('Prop year and month must be a non-negative number')
  }

  const minD =
    typeof options.min === 'string' ? parseDate(options.min) : options.min
  const maxD =
    typeof options.max === 'string' ? parseDate(options.max) : options.max

  const prevMonth = getMonthByStep({ year, month }, -1)
  const prevMonthLen = getMonthLen(prevMonth.year, prevMonth.month)
  const monthLen = getMonthLen(year, month)
  const nextMonth = getMonthByStep({ year, month }, 1)

  const lineLen = Math.ceil(31 / 7) + 1

  const calendar: DateInfo[][] = []

  const canChose = ($year: number, $month: number, date: number) => {
    const compare = (t: DateInfoBase1 | null | undefined, flag?: 1 | -1) => {
      if (!t) return true

      flag = flag || 1
      const y = +t.year
      const m = +t.month
      const d = +t.date
      return (
        ($year - y) * flag > 0 ||
        ($year === y && ($month - m) * flag > 0) ||
        ($year === y && $month === m && (date - d) * flag >= 0)
      )
    }
    return compare(minD) && compare(maxD, -1)
  }

  let incrementDate = 1
  let nextIncrementDate = 1
  const firstDay = getDay(year, month, 1)
  const fillDateLen = firstDay === 0 ? 7 : firstDay

  const now = nowDate()
  for (let i = 0; i < lineLen; i += 1) {
    calendar[i] = []

    for (let j = 0; j < 7; j += 1) {
      if (i === 0 && j < fillDateLen) {
        const d = prevMonthLen - fillDateLen + 1 + j
        calendar[i][j] = {
          year: fillTo(4, prevMonth.year),
          month: fillTo(2, prevMonth.month),
          date: fillTo(2, d),
          isInThisMonth: false,
          canBeChose: canChose(+prevMonth.year, +prevMonth.month, d),
          isNow: false,
        }
        calendar[i][j].isNow = calcStepBetweenDates(now, calendar[i][j]) === 0
        // eslint-disable-next-line no-continue
        continue
      }
      if (incrementDate <= monthLen) {
        calendar[i][j] = {
          year: fillTo(4, year),
          month: fillTo(2, month),
          date: fillTo(2, incrementDate),
          isInThisMonth: true,
          canBeChose: canChose(year, month, incrementDate),
          isNow: false,
        }
        calendar[i][j].isNow = calcStepBetweenDates(now, calendar[i][j]) === 0
        incrementDate += 1
      } else {
        calendar[i][j] = {
          year: fillTo(4, nextMonth.year),
          month: fillTo(2, nextMonth.month),
          date: fillTo(2, nextIncrementDate),
          isInThisMonth: false,
          canBeChose: canChose(
            +nextMonth.year,
            +nextMonth.month,
            nextIncrementDate,
          ),
          isNow: false,
        }
        calendar[i][j].isNow = calcStepBetweenDates(now, calendar[i][j]) === 0
        nextIncrementDate += 1
      }
    }
  }

  return calendar
}

export function getDateByStep(
  currDate: { year: IntegerStr; month: IntegerStr; date: IntegerStr } | DateStr,
  step: Integer,
): typeof currDate extends DateStr ? DateInfoBase | null : DateInfoBase {
  const $currDate =
    typeof currDate === 'string' ? parseDate(currDate) : currDate
  if (!$currDate) return null as any
  const len = getMonthLen($currDate.year, $currDate.month)
  const date = +$currDate.date + step
  if (date <= 0) {
    const prevMonth = getMonthByStep($currDate, -1)!
    return getDateByStep(
      { ...prevMonth, date: getMonthLen(prevMonth.year, prevMonth.month) },
      date,
    )
  }
  if (date > len) {
    const nextMonth = getMonthByStep($currDate, 1)!
    return getDateByStep({ ...nextMonth, date: 1 }, date - len)
  }
  return {
    year: fillTo(4, $currDate.year),
    month: fillTo(2, $currDate.month),
    date: fillTo(2, date),
  }
}
