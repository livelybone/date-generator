var fillTo = require('./utils').fillTo
var isNonNegInt = require('./utils').isNonNegInt

function gntYear(start, len, options) {
  if (!isNonNegInt(+start) || !isNonNegInt(+len)) {
    throw new Error('Prop start and len must be a non-negative number')
  }

  var splitLen = options.splitLen || 3
  var min = options.min || null
  var max = options.max || null

  var arr = []
  for (var i = 0; i < Math.ceil(len / splitLen); i++) {
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

exports.gntYear = gntYear
