import { Action } from '../actions/commissionActions'

export const commissionReducer = (state: any = '', action: Action) => {
  switch (action.type) {
    case 'SET_COMMISSION': {
      return action.payload
    }
    default:
      return state
  }
}
