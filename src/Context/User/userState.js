/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import userReducer from './userReducer';
import userContext from './userContext'
import Api from '../../utils/api'

import {
    GET_USERS,
    GET_USER,
    EDIT_USER,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    ERROR_USER,
    SEARCH_USERS
} from '../../types';

const UserState = props => {
    const initialState = {
        total: 0,
        users: [],
        usuario: null,
        message: null,
        loading:true,
    }

    const [state, dispatch] = useReducer(userReducer, initialState);

    const getUsers = async () => {
        try {
            const res = await Api.getUsers()
            if (res.msg === 'done') {
                dispatch({
                    type: GET_USERS,
                    payload: res
                })
            }
            
        } catch (error) {
            
        }
    }

    const addUser = async (args) => {
        try {
            const res = await Api.postUser(args);
            if (res.msg === 'done') {
                const alerta = {
                msg: `Se Agrego ${res.user.name} exitosamente`,
                categoria: 'success'
                }
        
                dispatch({
                    type: ADD_USER,
                    payload:alerta
                })
            }
            if (res.msg !== 'done') {
                const alerta = {
                msg: res.msg,
                categoria: 'danger'
                }
                dispatch({
                    type: ERROR_USER,
                    payload:alerta
                })
            }
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.msg,
                categoria: 'danger'
                }
                dispatch({
                    type: ERROR_USER,
                    payload:alerta
                })
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await Api.deleteUsers(id)
            console.log(res)
            if (res.msg === "done") {
                const alerta = {
                msg: `Se ha eliminado el ${res.user.email} exitosamente`,
                categoria: 'success'
            }
                dispatch({
                    type: DELETE_USER,
                    payload:alerta
                })
            } else {
        
            const alerta = {
                msg: `Hubo un error intente mas tarde`,
                categoria: 'danger'
            }
            dispatch({
                    type: ERROR_USER,
                    payload:alerta
                })
            }
        } catch (error) {
            
        }
    }


    const editUser = async (args) => {
        try {

                dispatch({
                    type: EDIT_USER,
                    payload: args
                })


        } catch (error) {

        }
    }

    const updateUser = async (id,args) => {
        try {
            const res = await Api.updateUser(id,args)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha actualizado ${res.user.email} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_USER,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }


    const searchUsers = async (term) => {

        try {
            const res = await Api.searchByUsers(term)
            dispatch({
                type: SEARCH_USERS,
                payload:res
            })
        } catch (error) {
            
        }
    }
    
    
    return (
        <userContext.Provider
            value={{
                total: state.total,
                users: state.users,
                usuario: state.usuario,
                message: state.message,
                loading: state.loading,
                getUsers,
                deleteUser,
                addUser,
                editUser,
                updateUser,
                searchUsers
        }} 
        >
            {
                props.children
            }
        </userContext.Provider>
    )

}


export default UserState
