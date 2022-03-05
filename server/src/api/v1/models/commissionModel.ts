import mongoose from '../../../config/DatabaseConfig'

export interface Transaction {
  client_id: number,
  date: Date,
  amount: number,
  currency: string,
  commission_amount: number,
  commission_currency: string,
}

const Schema = mongoose.Schema

const dataSchema = new Schema<Transaction>({
  client_id: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  commission_amount: { type: Number, required: true },
  commission_currency: { type: String, required: true }
})

export const model = mongoose.model<Transaction>('transactions', dataSchema, 'transactions')
