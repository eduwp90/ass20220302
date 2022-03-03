import { createStore, combineReducers } from 'redux'
import { commissionReducer } from './reducers/commissionReducer'
import { errorReducer } from './reducers/errorReducer'

export const store = createStore(
  combineReducers({ commission: commissionReducer, apiError: errorReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
