import React, { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { redirectProduct } from '../redux/products/selectors'
import { redirectProducts } from '../redux/products/actions'

const RedirectContext = createContext({})

export const RedirectContextProvider = ({ children }) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const redirect = useSelector(redirectProduct)

    useEffect(() => {
        if (redirect) {
            history('/')
            dispatch(redirectProducts(false))
        }
    }, [redirect])

    return (
        <>
            <RedirectContext.Provider value>
                {children}
            </RedirectContext.Provider>
        </>
    )
}

export const useRedirectContext = () => useContext(RedirectContext)

export default RedirectContext
