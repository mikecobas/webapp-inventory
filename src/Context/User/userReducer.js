/* eslint-disable import/no-anonymous-default-export */
import {
    GET_USERS,
    GET_USER,
    EDIT_USER,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    ERROR_USER
} from '../../types';


export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                total: action.payload.total,
                loading: false
            }
        case ADD_USER:
        case DELETE_USER:
            return {
                ...state,
                loading: true,
                message: action.payload
            }

        case ERROR_USER:
            return {
                ...state,
                message: action.payload
            }

        default:
            console.log('default')
            return state;

    }
}