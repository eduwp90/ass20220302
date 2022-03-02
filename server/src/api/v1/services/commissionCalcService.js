const { convertToEUR } = require('./exchangeService')
const { findMonthTransactions } = require('./transactionsService')

const HT_DISCOUNT = 0.03
const CLIENT_DISCOUNT = 0.05
const MIN_COMMISSION = 0.05
const DEFAULT_COMMISSION_PERCENT = 0.005

exports.getCommission = async (date, amount, clientId, currency) => {
  const newAmount = (currency !== 'EUR') ? await convertToEUR(currency, amount, date) : amount // Normalize amount to EUR
  return await pickCommission(date, newAmount, clientId)
}

async function pickCommission (date, amount, clientId) {
  // Add commission rules from most restrictive to less restrictive

  // High turnover discount (Rule #3)
  if (await highTurnoverDiscount(clientId, date)) return HT_DISCOUNT

  // Client with discount (Rule #2)
  if (clientId === 42) return CLIENT_DISCOUNT

  // Default discount (Rule #1)
  const comission = amount * DEFAULT_COMMISSION_PERCENT
  return (comission < MIN_COMMISSION) ? MIN_COMMISSION : comission
}

async function highTurnoverDiscount (clientId, date) {
  // Get user monthly transactions
  const transactions = await findMonthTransactions(clientId, date)

  // Get the amount spent during the month
  const monthSpending = transactions.reduce((acc, { amount }) => acc + amount, 0)

  return (monthSpending >= 1000)
}
