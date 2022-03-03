import { Action } from './commissionActions'

export const setApiError = (value:string): Action => ({
  type: 'SET_APIERROR', payload: value
})

export const clearApiError = (): Action => ({
  type: 'CLEAR_APIERROR', payload: ''
})
