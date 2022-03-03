export type Action = {type: 'SET_COMMISSION', payload: string}

export const setCommission = (value:string): Action => ({
  type: 'SET_COMMISSION', payload: value
})
