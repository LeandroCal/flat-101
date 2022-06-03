import { all, put, call, takeLatest } from 'redux-saga/effects'
import * as actionType from './actionTypes'
import {
    getProducts,
    addProduct,
    putProduct,
    deleteProduct,
} from '../../services/products'

function* fetchProductsSaga({ type }) {
    if (type === actionType.FETCH_PRODUCTS) {
        yield put({
            type: actionType.LOAD,
            payload: true,
        })
    }
    try {
        const productsResponse = yield call(getProducts)
        yield put({
            type: actionType.SET_PRODUCTS,
            payload: productsResponse.length ? productsResponse : null,
        })
    } catch (err) {
        console.log(err)
    } finally {
        if (type === actionType.FETCH_PRODUCTS) {
            yield put({
                type: actionType.LOAD,
                payload: false,
            })
        }
    }
}

function* addProductSaga({ payload: data }) {
    try {
        const productResponse = yield call(addProduct(data))
        console.log(productResponse)
        yield put({ type: actionType.ADD_PRODUCT, payload: productResponse })
    } catch (err) {
        console.log(err)
    }
}

function* updateProductSaga({ payload: data }) {
    try {
        const productResponse = yield call(putProduct(data))
        yield put({
            type: actionType.UPDATE_PRODUCT,
            payload: productResponse,
        })
    } catch (err) {
        console.log(err)
    }
}

function* deleteProductSaga({ payload }) {
    try {
        const productResponse = yield call(deleteProduct(payload))
        yield put({
            type: actionType.UPDATE_PRODUCT,
            payload: productResponse,
        })
    } catch (err) {
        console.log(err)
    }
}

export default function* productsSaga() {
    yield all([
        yield takeLatest(
            [
                actionType.FETCH_PRODUCTS,
                actionType.UPDATE_PRODUCT,
                actionType.DELETE_PRODUCT,
            ],
            fetchProductsSaga
        ),
        yield takeLatest(actionType.ADD_PRODUCT, addProductSaga),
        yield takeLatest(actionType.UPDATE_PRODUCT, updateProductSaga),
        yield takeLatest(actionType.DELETE_PRODUCT, deleteProductSaga),
    ])
}
