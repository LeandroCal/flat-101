import * as actionType from './actionTypes'

const initialState = {
    load: false,
    all: null,
    product: null,
    redirect: false,
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOAD: {
            return {
                ...state,
                load: action.payload,
            }
        }
        case actionType.REDIRECT: {
            return {
                ...state,
                redirect: action.payload,
            }
        }
        case actionType.SET_PRODUCTS: {
            return {
                ...state,
                all: action.payload,
            }
        }
        case actionType.SET_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            }
        }
        case actionType.ADD_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            }
        }
        case actionType.UPDATE_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            }
        }
        case actionType.DELETE_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}
