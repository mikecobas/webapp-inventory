/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import transactionReducer from './transactionReducer';
import transactionContext from './transactionContext'
import Moment from 'react-moment'
import moment from 'moment'
import Api from '../../utils/api'

import {
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    UPDATE_FILTERS
} from '../../types';

const TransactionState = props => {
    const initialState = {
        from: moment().startOf('month').format('DD/MM/YYYY'),
        to: moment().format('DD/MM/YYYY'),
        total:null,
        transactions: [],
        loading: true,
        message: null
    }

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const updateFilters = (from, to) => {
        const newFilters = {
            from,
            to
        }
        dispatch({
            type: UPDATE_FILTERS,
            payload: newFilters
        })
    }

    const getTransactions = async (from, to) => {
        try {
            
          
            const res = await Api.getTransactions(moment(from, 'YYYY-MM-DD').format('DD-MM-YYYY'), moment(to, 'YYYY-MM-DD').format('DD-MM-YYYY'));
            console.log(res)
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res
            })
            
        } catch (error) {
            
        }
    }

    return (
        <transactionContext.Provider
            value={{
                from: state.from,
                to: state.to,
                total:state.total,
                transactions: state.transactions,
                loading: state.loading,
                message: state.message,
                updateFilters,
                getTransactions
            }}
        >
            {props.children}
        </transactionContext.Provider>
    )
}


export default TransactionState;