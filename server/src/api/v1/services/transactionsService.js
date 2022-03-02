const model = require('../models/commissionModel')
const { getMonthRange } = require('../helpers/dateHelpers')

exports.findMonthTransactions = async (clientId, date) => {
  try {
    const monthRange = getMonthRange(date)
    const data = await model.find({
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
