const startOfMonth = require('date-fns/startOfMonth')
const endOfMonth = require('date-fns/endOfMonth')
const parseISO = require('date-fns/parseISO')

exports.getMonthRange = (date) => {
  const parsedDate = parseISO(date)
  return [startOfMonth(parsedDate), endOfMonth(parsedDate)]
}
