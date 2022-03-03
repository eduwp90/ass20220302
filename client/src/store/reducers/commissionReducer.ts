import { Action } from '../actions/commissionActions'

export interface commissionState {
  commission: string
}

const defaultState = {
  commission: ''
}

export const commissionReducer = (state: commissionState = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_COMMISSION': {
      return { commission: action.payload }
    }
    default:
      return state
  }
}
