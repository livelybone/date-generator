# @livelybone/date-generator
[![NPM Version](http://img.shields.io/npm/v/@livelybone/date-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/date-generator)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/date-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/date-generator)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module that generates years, months, dates, hours, minutes, seconds

## repository
https://github.com/livelybone/date-generator.git

## Demo
https://livelybone.github.io/tool/date-generator

## Installation
```bash
npm i -S @livelybone/date-generator
```

## Register
```js
// import all
import {
         gntYear,
         gntMonth,
         gntDate,
         getDay,
         getHour,
         getMinute,
         getSecond,
         fillTo,
         isNonNegInt,
         objAssign,
         mod,
         isLeapYear,
         getMonthLen,
         getIntervalVal,
         parseDate,
         parseTime
       } from '@livelybone/date-generator';

// import what you want
import gntDate from '@livelybone/date-generator/lib/umd/date'

...
```

## Functions
### `gntYear`

> `(start: Integer, len: Interger, options: {min: Interger, max: Interger}) => Array<{year: Integer, canBeChose: Boolean}>`

### `gntMonth`

> `(year: Integer, options: {min: String, max: String}) => Array<Array<{year: Integer, month: Integer, canBeChose: Boolean}>>`

> the properties of options is need to format like: `2018[-02][-01]`(RegExp: `/^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/`), such as: `2018-02-01` | `2018-02` | `2018`

### `gntDate`

> `(year: Integer, month: Interger, options: {min: String, max: String}) => Array<Array<{year: Integer, month: Integer, date: Integer, isInThisMonth: Boolean, canBeChose: Boolean}>>`

> the properties of options is need to format like: `2018[-02][-01]`(RegExp: `/^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/`), such as: `2018-02-01` | `2018-02` | `2018`

### `getDay`

> `(year: Integer, month: Interger, date: Integer) => Integer`, return options `[0, 1, 2, 3, 4, 5, 6]`

> the properties of options is need to format like: `2018[-02][-01]`(RegExp: `/^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/`), such as: `2018-02-01` | `2018-02` | `2018`

### `getHour`

> `(options: {interval: Integer, min: Integer, max: Integer}) => Array<{value: Integer, max: Integer, canBeChose: Boolean}>`

### `getMinute`

> `(options: {interval: Integer, min: Integer, max: Integer}) => Array<{value: Integer, max: Integer, canBeChose: Boolean}>`

### `getSecond`

> `(options: {interval: Integer, min: Integer, max: Integer}) => Array<{value: Integer, max: Integer, canBeChose: Boolean}>`

### `utils`
Here is the sub functions:

### `isNonNegInt`

> `(options: {interval: Integer, min: Integer, max: Integer}) => Array<{value: Integer, max: Integer, canBeChose: Boolean}>`

### `mod`

> `(val: Number, div: Number) => Number`

### `isLeapYear`

> `(year: Integer) => Boolean`

### `getMonthLen`

> `(year: Integer, month: Integer) => Integer`

### `getIntervalVal`

> `(defaultMax: Integer) => Function<(options: {interval: Integer, min: Integer, max: Integer}) => Array<{value: Integer, max: defaultMax, canBeChose: Boolean}>>`

### `parseDate`

> `(date: String) => Object<{year: Integer, month: Integer, date: Integer}>`

### `parseTime`

> `(time: String) => Object<{hour: Integer, minute: Integer, second: Integer}>`

### `fillTo`

> `(width: Integer, number: Number, pad: String) => String`

### `objAssign`

> `(o1: Object, o2: Object) => Object`
