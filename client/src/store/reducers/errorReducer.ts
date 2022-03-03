import { Action } from '../actions/commissionActions'

interface errorState {
  error: boolean,
  msg: string,
}

const initialState = {
  error: false,
  msg: ''
}

export const errorReducer = (state: errorState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_APIERROR': {
      return { error: true, msg: action.payload }
    }
    case 'CLEAR_APIERROR': {
      return { error: false, msg: '' }
    }
    default:
      return state
  }
}
