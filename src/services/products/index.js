import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'
import db from '../../libs/firebase/firebaseConfig'

export const getProducts = async () => {
    const response = await getDocs(collection(db, 'products'))
    return response?.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
    })
}

export const addProduct = async (data) => {
    try {
        await addDoc(collection(db, 'products'), data)
    } catch (error) {
        console.error(error)
    }
}

export const putProduct = async (data) => {
    try {
        const response = await updateDoc(doc(db, 'products', data.id), data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await deleteDoc(doc(db, 'products', id))
        return response
    } catch (error) {
        console.error(error)
    }
}
