/* eslint-disable import/no-anonymous-default-export */
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ADD_PRODUCT,
    SEARCH_PRODUCTS
} from '../../types';


export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                total:action.payload.total,
                loading:false
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                loading:true,
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                item:action.payload
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