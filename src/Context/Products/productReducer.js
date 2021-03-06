/* eslint-disable import/no-anonymous-default-export */
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


export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                total: action.payload.total,
                loading: false
            }
        case UPDATE_PRODUCT:
        case ERROR_PRODUCT:
        case ADD_PRODUCT:
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                message: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                product: action.payload
            }

        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload.results[1],
                total: action.payload.results[0],
                loading: false
            }


        default:
            console.log('default')
            return state;

    }
}