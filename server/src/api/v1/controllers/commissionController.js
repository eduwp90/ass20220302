const { getCommission } = require('../services/commissionCalcService')
const { roundTwoDecimals } = require('../helpers/mathHelpers')

exports.returnCommission = async (req, res) => {
  try {
    const { date, amount, currency, client_id: clientId } = req.body
    const commission = await getCommission(date, Number(amount), clientId, currency)
    const response = { amount: `${roundTwoDecimals(commission)}`, currency: 'EUR' }
    res.status(200)
    res.send(response)
  } catch (error) {
    console.error('Error: ', error)
    res.sendStatus(500)
  }
}
