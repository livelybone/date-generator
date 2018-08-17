const {
  gntYear,
  gntMonth,
  gntDate,
  getDay,
  getHour,
  getMinute,
  getSecond,
  utils: {
    isNonNegInt,
    isLeapYear,
    getMonthLen,
    getIntervalVal
  }
} = require('../src/index')

const assert = require('assert')

describe('utils', () => {
  it('Result of function isNonNegInt is expected', () => {
    assert.equal(isNonNegInt(0), true)
    assert.equal(isNonNegInt(12313213), true)
    assert.equal(isNonNegInt(12313213.1), false)
  })
})