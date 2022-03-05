import { getCommission } from '../services/commissionCalcService'
import { roundTwoDecimals } from '../helpers/mathHelpers'
import { Request, Response } from 'express'

interface commissionRequest {
  date:string,
  amount:string,
  currency:string,
  client_id: number
}

interface commissionResponse {
  amount:string,
  currency:string
}

export const returnCommission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date , amount, currency, client_id: clientId }: commissionRequest = req.body
    const commission: number = await getCommission(date, Number(amount), clientId, currency)
    const response: commissionResponse = { amount: `${roundTwoDecimals(commission)}`, currency: 'EUR' }
    res.status(200)
    res.send(response)
  } catch (error) {
    console.error('Error: ', error)
    res.sendStatus(500)
  }
}
