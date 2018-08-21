var isNonNegInt = require('./utils').isNonNegInt

function gntYear(start, len) {
  if (!isNonNegInt(+start) || !isNonNegInt(+len)) {
    throw new Error('Prop start and len must be a non-negative number')
  }

  var arr = []
  for (var i = 0; i < len; i++) {
    arr.push({ year: +start + i })
  }

  return arr
}

exports.gntYear = gntYear
