/**
 * Integer number
 * */
declare type Integer = number
declare type DefaultHourMax = 23
declare type DefaultMinuteMax = 59
declare type DefaultSecondMax = 59

/**
 * Format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * */
declare type DateStr = string

/**
 * Format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * */
declare type TimeStr = string

declare function fillTo(width: number, num: number, pad?: string): string
declare function fillTo(width: number): (num: number, pad?: string) => string

/**
 * Format: /^\d\d$/
 * */
declare type NumberStr = string

declare interface GetResultItem<M extends number = DefaultHourMax> {
  value: NumberStr
  max: M
  canBeChose: boolean
}

declare interface GetOptions {
  interval?: Integer
  min: Integer
  max: Integer
}

declare function getIntervalVal(defaultMax: Integer): (options: GetOptions) => GetResultItem<typeof defaultMax>[]

declare function getMonthLen(year: Integer, month: Integer): Integer

declare function isLeapYear(year: Integer): boolean

declare function isNonNegInt(num: Integer): boolean

declare function mod(val: number, div: number): number

declare function objAssign<O1 = {}, O2 = {}>(o1: O1, o2: O2): O1 & O2

interface DateInfoBase {
  year: Integer
  month: Integer
  date: Integer
}

declare function parseDate(date: DateStr): DateInfoBase

interface TimeInfo {
  hour: Integer
  minute: Integer
  second: Integer
}

declare function parseTime(time: TimeStr): TimeInfo

declare function getHour(options: GetOptions): GetResultItem<DefaultHourMax>[]

declare function getMinute(options: GetOptions): GetResultItem<DefaultMinuteMax>[]

declare function getSecond(options: GetOptions): GetResultItem<DefaultSecondMax>[]

declare function getDay(year: Integer, month: Integer, date: Integer): Integer

declare interface DateInfo extends DateInfoBase {
  isInThisMonth: boolean
  canBeChose: boolean
}

declare interface GntDateOptions {
  /**
   * Min date
   * */
  min?: DateStr
  /**
   * Max date
   * */
  max?: DateStr
}

declare function gntDate(year: Integer, month: Integer, options?: GntDateOptions): DateInfo[][]

declare interface MonthInfo {
  year: Integer
  month: Integer
  canBeChose: Boolean
}

declare interface GntMonthOptions {
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

declare function gntMonth(year: Integer, options: GntMonthOptions): MonthInfo[][]

declare interface GntYearOptions {
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

declare interface YearInfo {
  year: Integer
  canBeChose: Boolean
}

declare function gntYear(start: Integer, len: Integer, options: GntYearOptions): YearInfo[][]

export {
  fillTo,
  getIntervalVal,
  getMonthLen,
  isLeapYear,
  isNonNegInt,
  mod,
  objAssign,
  parseDate,
  parseTime,
  getHour,
  getMinute,
  getSecond,
  getDay,
  gntDate,
  gntMonth,
  gntYear,
}
