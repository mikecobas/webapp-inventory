/* eslint-disable import/no-anonymous-default-export */
import {
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    UPDATE_FILTERS
} from '../../types';


export default (state, action) => {
    switch (action.type) {

        case UPDATE_FILTERS:
            return {
                ...state,
                from: action.payload.from,
                to: action.payload.to,
                loading: true
            }

        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload.transactions,
                total:action.payload.total,
                loading: false
            }


        default:
            console.log('default')
            return state;

    }
}