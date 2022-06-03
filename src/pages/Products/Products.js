import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../../libs/firebase/firebaseConfig'
import { fetchProducts, setProduct } from '../../redux/products/actions'
import { getAllProducts, loadProducts } from '../../redux/products/selectors'
import Search from './Search/Search'
import Filters from './Filters/Filters'
import ProductList from './ProductList/ProductList'
import Loader from '../../components/Loader/Loader'
import { ReactComponent as Add } from '../../assets/icons/plus.svg'
import './Products.scss'

function Products() {
    const history = useNavigate()
    const dispatch = useDispatch()
    const allProducts = useSelector(getAllProducts)
    const loadingProducts = useSelector(loadProducts)

    const [imageList, setImageList] = useState([])
    const imageListRef = ref(storage, 'images/')

    const handleAddProduct = () => {
        dispatch(setProduct(null))
        history('/product')
    }

    useEffect(() => {
        const loadData = async () => {
            await listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url])
                    })
                })
            })
            await dispatch(fetchProducts())
        }
        loadData()
    }, [])

    return (
        <div className="products">
            <Search />
            <Filters />
            <div className="row">
                {loadingProducts ? (
                    Array.from(Array(6)).map((value, index) => {
                        return (
                            <div
                                key={index}
                                className="sm-col-12 md-col-6 lg-col-4 mt-20"
                            >
                                <Loader height={100} />
                                <Loader height={20} />
                                <Loader height={20} />
                            </div>
                        )
                    })
                ) : allProducts === null ? (
                    <div className="products-not-found sm-col-12 mt-30">
                        No hay productos
                    </div>
                ) : (
                    allProducts?.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="sm-col-12 md-col-6 lg-col-4 mt-20"
                            >
                                <ProductList
                                    images={imageList}
                                    data={product}
                                />
                            </div>
                        )
                    })
                )}
            </div>
            <div className="products-new" onClick={() => handleAddProduct()}>
                <Add />
            </div>
        </div>
    )
}

export default Products
