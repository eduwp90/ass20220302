interface commissionState {
  commission: string
}

const defaultState = {
  commission: ''
}

type Action = {type: 'SET_COMMISSION', payload: string}

export const commissionReducer = (state: commissionState = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_COMMISSION': {
      return { ...state, commission: action.payload }
    }
    default:
      return state
  }
}
