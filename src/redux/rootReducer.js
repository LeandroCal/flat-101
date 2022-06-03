import { combineReducers } from 'redux'
import { productsReducer } from '../redux/products/reducer'

export const rootReducer = () => {
    combineReducers({
        products: productsReducer,
    })
}
