import { DefaultMax, TimeInfo } from './types'
import { fillTo, getIntervalVal } from './utils'

export const getHour = getIntervalVal(DefaultMax.Hour)
export const getMinute = getIntervalVal(DefaultMax.Minute)
export const getSecond = getIntervalVal(DefaultMax.Second)

export function nowTime(): TimeInfo {
  const now = new Date()
  return {
    hour: fillTo(2, now.getHours()),
    minute: fillTo(2, now.getMinutes()),
    second: fillTo(2, now.getSeconds()),
  }
}
