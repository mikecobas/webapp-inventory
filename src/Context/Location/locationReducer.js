/* eslint-disable import/no-anonymous-default-export */
import {
    GET_LOCATIONS,
    GET_LOCATION,
    EDIT_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    ADD_LOCATION,
    SEARCH_LOCATIONS,
    RESTORE_LOCATION,
    ERROR_LOCATION
} from '../../types';

export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload.locations,
                total: action.payload.total,
                loading: false
            }
        case EDIT_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        
        case RESTORE_LOCATION:
        case UPDATE_LOCATION:
        case ADD_LOCATION:
            return {
                ...state,
                message: action.payload,
                loading: true
            }

        case DELETE_LOCATION:
            return {
                ...state,
                loading: true,
                message: action.payload
            }

        case ERROR_LOCATION:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case SEARCH_LOCATIONS:
            return {
                ...state,
                locations: action.payload.results[1],
                total: action.payload.results[0],
                loading: false
            }
        default:
            console.log('default')
            return state;

    }
}