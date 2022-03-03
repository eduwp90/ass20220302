import { tOptions, tCommissionRequest, tCommissionResponse } from "./ApiTypes"

const BASE_URL = process.env.REACT_APP_SERVERURL || 'http://localhost:3000';

const fetchRequest = (endPoint?: string, options?: tOptions) => {
   return fetch(BASE_URL + endPoint, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.log('Error: ', err))
}

const getCommission = (data: tCommissionRequest ): Promise<tCommissionResponse> => {
    return fetchRequest('/v1/commission', {
      method: 'get',
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data)
    })
}