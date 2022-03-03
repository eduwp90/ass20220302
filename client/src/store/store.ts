import { createStore } from 'redux'
import { commissionReducer } from './reducers/commissionReducer'

export const store = createStore(commissionReducer)
