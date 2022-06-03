import React, { useState } from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { storage } from '../../../libs/firebase/firebaseConfig'
import { ref, uploadBytes } from 'firebase/storage'
import RequiredField from './RequiredField/RequiredField'
import {
    addProduct,
    updateProduct,
    redirectProducts,
} from '../../../redux/products/actions'
import './ProductForm.scss'

const ProductForm = ({ data }) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const { id, name, description, image, price } = data || {}

    const initialValues = {
        name: name || '',
        description: description || '',
        price: price || 0,
        image: image || '',
    }

    const validateProductForm = (values) => {
        const errors = {}
        const requiredFields = ['name', 'description', 'price', 'image']

        requiredFields.forEach((field) => {
            if (!values[field]) {
                errors[field] = 'Campo obligatorio'
            }
        })

        // TODO: definir funciones específicas para validar los campos
        if (values.price < 0) errors.price = 'El precio debe ser mayor que 0'

        return errors
    }

    const handleSubmit = (values) => {
        const imageRef = ref(storage, `images/${file.name}`)
        uploadBytes(imageRef, file).then(() => {
            values.image = file.name

            if (id) dispatch(updateProduct({ ...data, ...values }))
            else dispatch(addProduct({ ...values, ...{ fav: false } }))

            dispatch(redirectProducts(true))
        })
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validate={(values) => validateProductForm(values)}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit} className="product-form row">
                        <div className="product-form_field sm-col-12 lg-col-6">
                            <input
                                id="add-product-name"
                                type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                className={
                                    errors.name && touched.name && 'error'
                                }
                                onChange={handleChange}
                                value={values.name}
                            />
                            {errors.name && touched.name && (
                                <RequiredField text={errors.name} />
                            )}
                        </div>
                        <div className="product-form_field sm-col-12 lg-col-6">
                            <input
                                id="add-product-price"
                                type="number"
                                name="price"
                                placeholder="Precio del producto"
                                className={
                                    errors.price && touched.price && 'error'
                                }
                                onChange={handleChange}
                                value={values.price}
                            />
                            {errors.price && touched.price && (
                                <RequiredField text={errors.price} />
                            )}
                        </div>
                        <div className="product-form_field sm-col-12">
                            <textarea
                                id="add-product-description"
                                rows="10"
                                name="description"
                                placeholder="Descripción del producto"
                                className={
                                    errors.description &&
                                    touched.description &&
                                    'error'
                                }
                                onChange={handleChange}
                                value={values.description}
                            />
                            {errors.description && touched.description && (
                                <RequiredField text={errors.description} />
                            )}
                        </div>
                        <div className="product-form_field sm-col-12">
                            <label className="product-form_field-upload">
                                <input
                                    id="add-product-image"
                                    type="file"
                                    name="image"
                                    onChange={(event) => {
                                        setFile(event.currentTarget.files[0])
                                        setFieldValue(
                                            'image',
                                            event.currentTarget.files[0]
                                        )
                                    }}
                                />
                                {values.image.name || values.image
                                    ? 'Cambiar'
                                    : 'Subir'}{' '}
                                imagen
                            </label>
                            {errors.image && touched.image && (
                                <RequiredField text={errors.image} />
                            )}
                            <span className="ml-10">
                                {typeof values.image === 'string'
                                    ? values.image
                                    : values.image?.name}
                            </span>
                        </div>

                        <div className="product-form_submit sm-col-12 mt-20">
                            <button
                                id="add-product-submit"
                                type="submit"
                                className={`${id ? 'edit' : 'add'}`}
                            >
                                {id ? 'Editar' : 'Crear'} producto
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default ProductForm
