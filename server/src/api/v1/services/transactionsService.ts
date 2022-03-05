import { model,Transaction } from '../models/commissionModel'
import { getMonthRange } from '../helpers/dateHelpers'

export const findMonthTransactions = async (clientId:number, date: string): Promise<Transaction[]> => {
  try {
    const monthRange: Date[] = getMonthRange(date)
    const data: Transaction[] = await model.find({
      date: {
        $gte: monthRange[0],
        $lt: monthRange[1]
      },
      client_id: clientId
    })
    return data
  } catch (error) {
    console.error('Error: ', error)
  }
}
