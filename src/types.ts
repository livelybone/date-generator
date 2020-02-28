/**
 * Integer number
 * */
export type Integer = number
export type IntegerStr = Integer | string

export enum DefaultMax {
  Hour = 23,
  Minute = 59,
  Second = 59,
}

/**
 * Format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * */
export type DateStr = string

/**
 * Format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * */
export type TimeStr = string

/**
 * Format: /^\d\d$/
 * */
export type NumberStr = string

export interface GetResultItem<M extends DefaultMax> {
  value: NumberStr
  max: M
  canBeChose: boolean
}

export interface GetOptions {
  interval?: Integer
  min?: Integer
  max?: Integer
}

export interface DateInfoBase {
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

export interface TimeInfo {
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

export interface DateInfo extends DateInfoBase {
  isInThisMonth: boolean
  canBeChose: boolean
}

export interface GntCalendarOptions {
  /**
   * Min date
   * */
  min?: DateStr
  /**
   * Max date
   * */
  max?: DateStr
}

export interface MonthInfo {
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

export interface GntMonthOptions {
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

export interface GntYearOptions {
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

export interface YearInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: string
  canBeChose: boolean
}
