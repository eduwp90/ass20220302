const mongoose = require('../../../config/DatabaseConfig')

const Schema = mongoose.Schema

const dataSchema = new Schema({
  client_id: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  commission_amount: { type: Number, required: true },
  commission_currency: { type: String, required: true }
})

module.exports = mongoose.model('transactions', dataSchema, 'transactions')
