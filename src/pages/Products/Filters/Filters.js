import React from 'react'
import { useSelector } from 'react-redux'
import { getAllProducts } from '../../../redux/products/selectors'
import './Filters.scss'
import { ReactComponent as Arrow } from '../../../assets/icons/chevron-arrow-bottom.svg'

function Filters() {
    const allProducts = useSelector(getAllProducts) || []

    return (
        <div className="filters mt-20 mb-20">
            <div className="filters-select filters-select_selected">
                <span>
                    Productos{' '}
                    {!!allProducts.length ? `(${allProducts.length})` : ''}
                </span>
                <Arrow />
            </div>
            <div className="filters-select uppercase">
                <span>Ordenar por</span>
                <Arrow />
            </div>
        </div>
    )
}

export default Filters
