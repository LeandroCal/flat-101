import React from 'react'
import { useSelector } from 'react-redux'
import { getAllProducts } from '../../../redux/products/selectors'
import './Search.scss'

function Search() {
    const allProducts = useSelector(getAllProducts) || []

    return (
        <div className="search">
            <div className="search-items fw-300 fs-18">
                {allProducts.length || 0} Items found
            </div>
            <div className="search-title fw-800 fs-22 mt-10">
                Search Results for "Bathroom taps"
            </div>
        </div>
    )
}

export default Search
