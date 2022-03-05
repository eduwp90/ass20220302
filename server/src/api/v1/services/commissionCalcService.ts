import { Transaction } from '../models/commissionModel'
import { convertToEUR } from './exchangeService'
import { findMonthTransactions } from './transactionsService'

const HT_DISCOUNT = 0.03
const CLIENT_DISCOUNT = 0.05
const MIN_COMMISSION = 0.05
const DEFAULT_COMMISSION_PERCENT = 0.005

export const getCommission = async (date:string, amount: number, clientId:number, currency:string): Promise<number> => {
  const newAmount: number = (currency !== 'EUR') ? await convertToEUR(currency, amount, date) : amount // Normalize amount to EUR
  return await pickCommission(date, newAmount, clientId)
}

async function pickCommission (date:string, amount:number, clientId:number): Promise<number> {
  // Add commission rules from most restrictive to less restrictive

  // High turnover discount (Rule #3)
  if (await highTurnoverDiscount(clientId, date)) return HT_DISCOUNT

  // Client with discount (Rule #2)
  if (clientId === 42) return CLIENT_DISCOUNT

  // Default discount (Rule #1)
  const comission = amount * DEFAULT_COMMISSION_PERCENT
  return (comission < MIN_COMMISSION) ? MIN_COMMISSION : comission
}

async function highTurnoverDiscount (clientId:number, date:string): Promise<boolean> {
  // Get user monthly transactions
  const transactions: Transaction[] = await findMonthTransactions(clientId, date)

  // Get the amount spent during the month
  const monthSpending:number = transactions.reduce((acc:number, { amount }:{ amount:number }) => acc + amount, 0)

  return (monthSpending >= 1000)
}
