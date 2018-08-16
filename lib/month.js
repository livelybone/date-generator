var isNonNegInt = require('./utils').isNonNegInt

function gntMonth(start, end) {
  start = start || 1;
  end = end || 12;

  if (!isNonNegInt(+start) || !isNonNegInt(end)) {
    throw new Error('Prop start and end must be a non-negative number')
  }
  if (+start < 1) {
    throw new Error('Prop start must be greater than 0')
  }
  if (+end > 12) {
    throw new Error('Prop start must be less than 12')
  }
  if (+start >= +end) {
    throw new Error('Rule `+start < +end` must be matched')
  }

  var arr = [];
  for (var i = +start; i <= +end; i++) {
    arr.push(i < 10 ? '0' + i : i + '')
  }

  return arr;
}

if (typeof exports === 'object') {
  exports.gntMonth = gntMonth
}