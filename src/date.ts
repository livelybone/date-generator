import { getMonthByStep } from './month'
import {
  DateInfo,
  DateInfoBase,
  DateStr,
  GntCalendarOptions,
  Integer,
  IntegerStr,
} from './types'
import { fillTo, getMonthLen, isNonNegInt, parseDate } from './utils'
import { getDay } from './week'

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

  const minD = options.min && parseDate(options.min)
  const maxD = options.max && parseDate(options.max)

  const prevMonth = getMonthByStep({ year, month }, -1)
  const prevMonthLen = getMonthLen(prevMonth.year, prevMonth.month)
  const monthLen = getMonthLen(year, month)
  const nextMonth = getMonthByStep({ year, month }, 1)

  const lineLen = Math.ceil(31 / 7) + 1

  const calendar: DateInfo[][] = []

  const canChose = ($year: number, $month: number, date: number) => {
    const compare = (
      t: DateInfoBase | '' | null | undefined,
      flag?: 1 | -1,
    ) => {
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
        }
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
        }
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
        }
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
