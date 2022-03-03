import { createStore, combineReducers } from 'redux'
import { commissionReducer } from './reducers/commissionReducer'
import { errorReducer, errorState } from './reducers/errorReducer'

export interface rootState {
  commission: string,
  apiError: errorState
}

export const store = createStore(
  combineReducers({ commission: commissionReducer, apiError: errorReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
