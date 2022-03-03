import { createStore, combineReducers } from 'redux'
import { commissionReducer } from './reducers/commissionReducer'

export const store = createStore(
  combineReducers({ commission: commissionReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
