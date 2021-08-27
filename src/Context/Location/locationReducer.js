/* eslint-disable import/no-anonymous-default-export */
import {
    GET_LOCATIONS,
    GET_LOCATION,
    EDIT_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    ADD_LOCATION
} from '../../types';

export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload.categories,
                total: action.payload.total,
                loading:false
            }
            
        case ADD_LOCATION:
            return {
                ...state,
                message: action.payload,
                loading:true
            }
        
        case DELETE_LOCATION:
            return {
                ...state,
                loading: true,
                message:action.payload
            }
        default:
            console.log('default')
            return state;

    }
}