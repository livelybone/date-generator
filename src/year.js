import { fillTo, isNonNegInt } from './utils'

export function gntYear(start, len, options) {
  if (!isNonNegInt(+start) || !isNonNegInt(+len)) {
    throw new Error('Prop start and len must be a non-negative number')
  }

  var splitLen = options.splitLen || 3
  var min = options.min || null
  var max = options.max || null

  var arr = []
  var line = Math.ceil(len / splitLen)
  for (var i = 0; i < line; i++) {
    arr[i] = []
    for (var j = 0; j < splitLen; j++) {
      var year = start + i * splitLen + j
      if (year - start + 1 > len) break
      arr[i].push({
        year: fillTo(4, year),
        canBeChose: (!min && !max)
        || (min && max && year >= min && year <= max)
        || (!min && max && year <= max)
        || (!max && min && year >= min)
      })
    }
  }

  return arr
}
