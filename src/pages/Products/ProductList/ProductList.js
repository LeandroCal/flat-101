import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'
import {
    updateProduct,
    deleteProduct,
    setProduct,
} from '../../../redux/products/actions'
import './ProductList.scss'
import { ReactComponent as HeartFull } from '../../../assets/icons/heart-full.svg'
import { ReactComponent as HeartEmpty } from '../../../assets/icons/heart-empty.svg'
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg'
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg'

function ProductList({ images, data }) {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = useState(false)

    const { id, description, fav, name, price, image } = data || {}
    const findImg = images.find((img) => img.includes(image))

    const handleChangeFav = () => {
        dispatch(updateProduct({ ...data, ...{ fav: !fav } }))
    }

    const handleOpenDeleteModal = () => {
        setIsOpen(true)
        dispatch(setProduct({ ...data }))
    }

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id))
        setIsOpen(false)
    }

    const handleEditProduct = () => {
        history(`/product/${id}`)
        dispatch(setProduct({ ...data }))
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <>
            <div className="product-list">
                <div className="product-list-image">
                    <img src={findImg} />
                    <div
                        className="product-list-image_fav"
                        onClick={handleChangeFav}
                    >
                        {!!fav ? <HeartFull /> : <HeartEmpty />}
                    </div>
                </div>
                <div className="product-list-title mt-5">{name}</div>
                <div className="product-list-description mt-5">
                    {description}
                </div>
                <div className="product-list-price mt-20">
                    {price ? `${price} €` : 'Consultar'}
                </div>
                <div className="product-list-actions mt-20 mb-10">
                    <div
                        className="product-list-actions_edit mr-15"
                        onClick={() => handleEditProduct()}
                    >
                        <Edit />
                    </div>
                    <div
                        className="product-list-actions_delete ml-15"
                        onClick={() => handleOpenDeleteModal()}
                    >
                        <Delete />
                    </div>
                </div>
            </div>
            {/* Extraer componente para reutilizar */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <div className="modal">
                    <div className="modal-title mb-10">Eliminar producto</div>
                    <div className="modal-content mb-20">
                        ¿Está seguro que quiere eliminar el producto{' '}
                        <strong>{name}</strong>?
                    </div>
                    <div className="modal-actions">
                        <div
                            className="modal-actions_confirm mr-10"
                            onClick={() => handleDeleteProduct(id)}
                        >
                            Eliminar
                        </div>
                        <div
                            className="modal-actions_cancel ml-10"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductList
