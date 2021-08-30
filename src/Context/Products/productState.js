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
    SEARCH_PRODUCTS
} from '../../types';

const ProductState = props => {
    const initialState = {
        total: 0,
        products: [],
        item: null,
        loading: true
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    const getProducts = async () => {
        try {
            const res = await Api.getProducts()
            if (!res.msg) {
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
            if (!res.msg) {
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: res
                })

            }

        } catch (error) {

        }
    }

    const editProduct = async (item) => {
        dispatch({
                    type: EDIT_PRODUCT,
                    payload: item
                })
    }

    const searchProducts = async (term) => {

        try {
            const res = await Api.searchByProducts(term)
            dispatch({
                type: SEARCH_PRODUCTS,
                payload:res
            })
        } catch (error) {
            
        }
    }

    return (
        <productContext.Provider
            value={{
                total: state.total,
                products: state.products,
                item: state.item,
                loading: state.loading,
                getProducts,
                deleteProduct,
                editProduct,
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
