import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL = 'https://api.exchangerate.host'

interface exchangeApiResponse {
    motd: {
      msg: string,
      url: string
    },
    success: boolean,
    query: { from: string, to: string, amount: number },
    info: { rate: number },
    historical: boolean,
    date: string,
    result: number
  }

async function fetchRequest (path: string, options?: AxiosRequestConfig): Promise<exchangeApiResponse> {
  try {
    const res: AxiosResponse<any, any> = await axios(BASE_URL + path, options)
    if (res.status > 400) throw new Error('Error in exchange API')
    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const convertToEUR = async (currency:string, amount:number, date:string): Promise<number> => {
  const res: exchangeApiResponse = await fetchRequest(`/convert?from=${currency}&to=EUR&date=${date}&amount=${amount}`)
  return res.result
}
