import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga'

import { default as productsSaga } from './products/sagas'

const sagaMiddleware = createSagaMiddleware()

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middleware =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    process.env.NODE_ENV === 'development'
        ? compose(applyMiddleware(sagaMiddleware), reduxDevTools)
        : applyMiddleware(sagaMiddleware)

export const store = createStore(rootSaga, middleware)

sagaMiddleware.run(productsSaga)
