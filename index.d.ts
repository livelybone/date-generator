/**
 * Integer number
 * */
declare type Integer = number
declare type IntegerStr = Integer | string
declare enum DefaultMax {
  Hour = 23,
  Minute = 59,
  Second = 59,
}
/**
 * Format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * */
declare type DateStr = string
/**
 * Format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * */
declare type TimeStr = string
/**
 * Format: /^\d\d$/
 * */
declare type NumberStr = string
interface GetResultItem<M extends DefaultMax> {
  value: NumberStr
  max: M
  canBeChose: boolean
}
interface GetOptions {
  interval?: Integer
  min: Integer
  max: Integer
}
interface DateInfoBase {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: string
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  month: string
  /**
   * String that already been formatted, such as `01`
   *
   * 已格式化的字符串，例如：`01`
   * */
  date: string
}
interface TimeInfo {
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  hour: string
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  minute: string
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  second: string
}
interface DateInfo extends DateInfoBase {
  isInThisMonth: boolean
  canBeChose: boolean
}
interface GntCalendarOptions {
  /**
   * Min date
   * */
  min?: DateStr
  /**
   * Max date
   * */
  max?: DateStr
}
interface MonthInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: string
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  month: string
  canBeChose: boolean
}
interface GntMonthOptions {
  /**
   * Default: 3
   * */
  splitLen?: number
  /**
   * Min Month
   * */
  min?: DateStr
  /**
   * Max Month
   * */
  max?: DateStr
}
interface GntYearOptions {
  /**
   * Default: 3
   * */
  splitLen?: number
  /**
   * Min year
   * */
  min?: Integer
  /**
   * Max year
   * */
  max?: Integer
}
interface YearInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: string
  canBeChose: boolean
}

declare function gntDate(
  year: IntegerStr,
  month: IntegerStr,
  options?: GntCalendarOptions,
): DateInfo[][]
declare function getDateByStep(
  currDate:
    | {
        year: IntegerStr
        month: IntegerStr
        date: IntegerStr
      }
    | DateStr,
  step: Integer,
): typeof currDate extends DateStr ? DateInfoBase | null : DateInfoBase

declare const getHour: (options: GetOptions) => GetResultItem<DefaultMax.Hour>[]
declare const getMinute: (
  options: GetOptions,
) => GetResultItem<DefaultMax.Minute>[]
declare const getSecond: (
  options: GetOptions,
) => GetResultItem<DefaultMax.Minute>[]

declare function gntMonth(
  year: IntegerStr,
  options?: GntMonthOptions,
): MonthInfo[][]
declare function getMonthByStep(
  currMonth:
    | {
        year: IntegerStr
        month: IntegerStr
      }
    | DateStr,
  step: Integer,
): typeof currMonth extends DateStr
  ? Pick<MonthInfo, 'year' | 'month'> | null
  : Pick<MonthInfo, 'year' | 'month'>

declare function fillTo(width: Integer, num: IntegerStr, pad?: string): string
declare function isNonNegInt(num: IntegerStr): boolean
declare function objAssign<T extends any, U extends any>(o1: T, o2: U): T & U
declare function positiveMod(val: number, div: number): number
declare function isLeapYear(year: IntegerStr): boolean
declare function getMonthLen(
  year: IntegerStr,
  month: IntegerStr,
): 29 | 28 | 31 | 30
declare function getIntervalVal<T extends DefaultMax>(
  defaultMax: T,
): (options: GetOptions) => GetResultItem<T>[]
declare function parseDate(date: DateStr): DateInfoBase | null
declare function parseTime(time: TimeStr): TimeInfo | null

declare function getDay(
  year: IntegerStr,
  month: IntegerStr,
  date: IntegerStr,
): number

declare function gntYear(
  start: IntegerStr,
  len: Integer,
  options?: GntYearOptions,
): YearInfo[][]

export {
  DateInfo,
  DateInfoBase,
  DateStr,
  DefaultMax,
  GetOptions,
  GetResultItem,
  GntCalendarOptions,
  GntMonthOptions,
  GntYearOptions,
  Integer,
  IntegerStr,
  MonthInfo,
  NumberStr,
  TimeInfo,
  TimeStr,
  YearInfo,
  fillTo,
  getDateByStep,
  getDay,
  getHour,
  getIntervalVal,
  getMinute,
  getMonthByStep,
  getMonthLen,
  getSecond,
  gntDate,
  gntMonth,
  gntYear,
  isLeapYear,
  isNonNegInt,
  objAssign,
  parseDate,
  parseTime,
  positiveMod,
}
