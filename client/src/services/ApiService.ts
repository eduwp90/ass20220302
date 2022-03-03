import { tOptions, tCommissionRequest, tCommissionResponse } from './ApiTypes'

const BASE_URL = 'http://localhost:3001'

const fetchRequest = (endPoint?: string, options?: tOptions) => {
  return fetch(BASE_URL + endPoint, options)
    .then(res => res.status < 400 ? res : Promise.reject(new Error('Error reaching the API')))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.log('Error: ', err))
}

export const getCommission = (data: tCommissionRequest): Promise<tCommissionResponse> => {
  return fetchRequest('/v1/commission', {
    method: 'post',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}
