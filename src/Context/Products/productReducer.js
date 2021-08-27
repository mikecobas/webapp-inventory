/* eslint-disable import/no-anonymous-default-export */
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ADD_PRODUCT
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


        default:
            console.log('default')
            return state;

    }
}