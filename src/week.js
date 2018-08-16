function getDay(year, month, date) {
  year = +year
  month = +month
  date = +date

  var c = Math.floor(year / 100)
  var y = year % 100
  var m = month === 1 || month === 2 ? month + 2 : month

  return (y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor(26 * (m + 1) / 10) + date - 1) % 7
}

exports.getDay = getDay
