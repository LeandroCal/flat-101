import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getSelectedProduct } from '../../redux/products/selectors'
import ProductForm from './ProductForm/ProductForm'
import './Product.scss'

function Product() {
    const { id } = useParams()
    const history = useNavigate()
    const selectedProduct = useSelector(getSelectedProduct)

    useEffect(() => {
        if (id && !selectedProduct) history('/')
    }, [id, selectedProduct])

    return (
        <div className="product">
            <div className="product-title mb-20">
                {id ? 'Editar' : 'Nuevo'} producto
            </div>
            <ProductForm data={selectedProduct} />
        </div>
    )
}

export default Product
