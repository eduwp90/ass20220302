const axios = require('axios')

const BASE_URL = 'https://api.exchangerate.host'

async function fetchRequest (path, options) {
  try {
    const res = await axios(BASE_URL + path, options)
    if (res.status > 400) throw new Error('Error in exchange API')
    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
}

exports.convertToEUR = async (currency, amount, date) => {
  const res = await fetchRequest(`/convert?from=${currency}&to=EUR&date=${date}&amount=${amount}`)
  return res.result
}
