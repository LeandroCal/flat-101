import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './utils/constants'

import Layout from './containers/Layout'
import Products from './pages/Products/Products'
import Product from './pages/Product/Product'

export default function RootRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTES.PRODUCTS}
                exact
                element={
                    <Layout>
                        <Products />
                    </Layout>
                }
            />
            <Route
                path={ROUTES.NEW_PRODUCT}
                exact
                element={
                    <Layout>
                        <Product />
                    </Layout>
                }
            />
            <Route
                path={ROUTES.EDIT_PRODUCT}
                exact
                element={
                    <Layout>
                        <Product />
                    </Layout>
                }
            />
            <Route
                path="*"
                element={
                    <Layout>
                        <Products />
                    </Layout>
                }
            />
        </Routes>
    )
}
