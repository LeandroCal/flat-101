import { combineReducers } from 'redux'
import { productsReducer } from './products/reducer'

export const rootSaga = combineReducers({
    products: productsReducer,
})
