var fillTo = require('./utils').fillTo
var parseDate = require('./utils').parseDate

function gntMonth(year, options) {
  year = +year
  var splitLen = options.splitLen || 3
  var min = options.min && parseDate(options.min, 'month')
  var max = options.max && parseDate(options.max, 'month')

  var arr = []
  for (var i = 0; i < Math.ceil(12 / splitLen); i++) {
    arr[i] = []
    for (var j = 0; j <= splitLen; j++) {
      var month = i * splitLen + j + 1
      if (month > 12) break
      arr[i].push({
        year: fillTo(4, year),
        month: fillTo(2, month),
        canBeChose: (!min && !max)
        || (min && max && (year > min.year || (year === min.year && month >= min.month)) && (year < max.year || (year === max.year && month <= max.month)))
        || (!max && min && (year > min.year || (year === min.year && month >= min.month)))
        || (!min && max && (year < max.year || (year === max.year && month <= max.month)))
      })
    }
  }

  return arr
}

exports.gntMonth = gntMonth
