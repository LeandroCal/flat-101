import {
    LOAD,
    REDIRECT,
    SET_PRODUCTS,
    SET_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    FETCH_PRODUCTS,
} from './actionTypes'

export const loadProducts = (data) => {
    return {
        type: LOAD,
        payload: data,
    }
}
export const redirectProducts = (data) => {
    return {
        type: REDIRECT,
        payload: data,
    }
}
export const fetchProducts = () => {
    return {
        type: FETCH_PRODUCTS,
    }
}
export const getProducts = (data) => {
    return {
        type: SET_PRODUCTS,
        payload: data,
    }
}
export const setProduct = (data) => {
    return {
        type: SET_PRODUCT,
        payload: data,
    }
}
export const addProduct = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data,
    }
}
export const updateProduct = (data) => {
    return {
        type: UPDATE_PRODUCT,
        payload: data,
    }
}
export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        payload: id,
    }
}
