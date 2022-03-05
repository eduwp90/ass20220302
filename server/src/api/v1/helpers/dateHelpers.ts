import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import parseISO from 'date-fns/parseISO'

export const getMonthRange = (date: string): Date[] => {
  const parsedDate: Date = parseISO(date)
  return [startOfMonth(parsedDate), endOfMonth(parsedDate)]
}
