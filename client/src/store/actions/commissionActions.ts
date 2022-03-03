export type Action = {type: string, payload: string}

export const setCommission = (value:string): Action => ({
  type: 'SET_COMMISSION', payload: value
})
