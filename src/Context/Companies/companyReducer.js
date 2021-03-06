/* eslint-disable import/no-anonymous-default-export */
import {
    GET_COMPANIES,
    GET_COMPANY,
    EDIT_COMPANY,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    ADD_COMPANY,
    ACTIVE_COMPANY,
    ERROR_COMPANIES,
    SEARCH_COMPANIES
} from '../../types';


export default (state, action) => {
   
    switch (action.type) {
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload.companies,
                total: action.payload.total,
                loading: false
            }
        case EDIT_COMPANY:
            return {
                ...state,
                company: action.payload
            }
        case ACTIVE_COMPANY:
        case UPDATE_COMPANY:
        case ADD_COMPANY:
        case DELETE_COMPANY:
            return {
                ...state,
                loading: true,
                message: action.payload
            }
        case ERROR_COMPANIES:
            return {
                ...state,
                loading:false,
                message:action.payload
            }
        case SEARCH_COMPANIES:
            return {
                ...state,
                companies: action.payload.results[1],
                total: action.payload.results[0],
                loading:false
            }

        default:
            console.log('default')
            return state;

    }
}