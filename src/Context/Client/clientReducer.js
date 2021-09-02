/* eslint-disable import/no-anonymous-default-export */
import {
    GET_CLIENTS,
    GET_CLIENT,
    EDIT_CLIENT,
    DELETE_CLIENT,
    UPDATE_CLIENT,
    ADD_CLIENT,
    SEARCH_CLIENTS
} from '../../types';


export default (state, action) => {
   
    switch (action.type) {
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload.clients,
                total: action.payload.total,
                loading: false
            }
        case EDIT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case UPDATE_CLIENT:
           
            return {
                ...state,
                loading: true,
                message: action.payload
            }
        
        case ADD_CLIENT:
        case DELETE_CLIENT:
           
            return {
                ...state,
                loading: true,
                message: action.payload
            }

        case SEARCH_CLIENTS:
            return {
                ...state,
                total: action.payload.results[0],
                clients: action.payload.results[1],
                loading:false
            } 
        default:
            console.log('default')
            return state;

    }
}