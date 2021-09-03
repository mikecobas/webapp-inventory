/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import productContext from './productContext';
import productReducer from './productReducer'
import Api from '../../utils/api'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ADD_PRODUCT,
    SEARCH_PRODUCTS,
    ERROR_PRODUCT
} from '../../types';

const ProductState = props => {
    const initialState = {
        total: 0,
        products: [],
        product: null,
        loading: true,
        message: null
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    const getProductsList = async () => {
        try {
            const res = await Api.getProducts()
            if (res.msg === 'done') {
                dispatch({
                    type: GET_PRODUCTS,
                    payload: res
                })
            }

        } catch (error) {

        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await Api.deleteProduct(id)
            if (res.msg === 'done') {
                const alerta = {
                    msg: `Se eliminio ${res.productDeleted.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: alerta
                })

            } else {
                const alerta = {
                    msg: `Algo salio mal`,
                    categoria: 'warning'
                }
                dispatch({
                    type: ERROR_PRODUCT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const editProduct = async (product) => {
        dispatch({
            type: EDIT_PRODUCT,
            payload: product
        })
    }

    const addProduct = async (args) => {
        try {
            const res = await Api.postProduct(args)
            if (res.msg === 'done') {
                const alerta = {
                    msg: `Se Agrego ${res.product.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: ADD_PRODUCT,
                    payload: alerta
                })

            } else {
                const alerta = {
                    msg: res.msg,
                    categoria: 'danger'
                }
                dispatch({
                    type: ERROR_PRODUCT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const updateProduct = async (id, args) => {

        try {
            const res = await Api.updateProduct(id, args)

            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha actualizado ${res.product.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: alerta
                })
            } else {
                const alerta = {
                    msg: `No pudimos actualizar ${args.name}, intenta más tarde`,
                    categoria: 'warning'
                }
                dispatch({
                    type: ERROR_PRODUCT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const restoreProduct = async (id) => {
        try {
            const res = await Api.restoreProduct(id)

            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha restaurado ${res.productRecovered.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }



    const searchProducts = async (term) => {

        try {
            const res = await Api.searchByProducts(term)
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: res
            })
        } catch (error) {

        }
    }

    /** TODO UPDATE y RESTORE */

    return (
        <productContext.Provider
            value={{
                total: state.total,
                products: state.products,
                product: state.product,
                loading: state.loading,
                message: state.message,
                getProductsList,
                deleteProduct,
                editProduct,
                addProduct,
                updateProduct,
                restoreProduct,
                searchProducts
            }}
        >
            {
                props.children
            }
        </productContext.Provider>
    )
}

export default ProductState;
