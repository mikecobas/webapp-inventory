/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import clientContext from './clientContext';
import clientReducer from './clientReducer';
import Api from '../../utils/api'

import {
    GET_CLIENTS,
    GET_CLIENT,
    EDIT_CLIENT,
    DELETE_CLIENT,
    UPDATE_CLIENT,
    ADD_CLIENT,
    SEARCH_CLIENTS
} from '../../types';


const ClientState = props => {
    const initialState = {
        total: 0,
        clients: [],
        client: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(clientReducer, initialState);

    const getClients = async () => {
        try {
            const res = await Api.getClients()
            if (res.msg === 'done') {
                dispatch({
                    type: GET_CLIENTS,
                    payload: res
                })
            }

        } catch (error) {

        }
    }

    const addClient = async (args) => {
        try {

            const res = await Api.postClient(args)

            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha agregado ${res.data.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: ADD_CLIENT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const updateClient = async (id,args) => {
        try {
            const res = await Api.updateClient(id,args)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha actualizado ${res.client.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_CLIENT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }
    const editClient = async (args) => {
        try {

                dispatch({
                    type: EDIT_CLIENT,
                    payload: args
                })


        } catch (error) {

        }
    }

    const restoreClient = async (id) => {
        try {
            const res = await Api.restoreClient(id)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha restaurado${res.clientRestored.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_CLIENT,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const deleteClient = async (id) => {
        try {
            const res = await Api.deleteClient(id)
            console.log(res)
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha eliminado ${res.clientDeleted.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: DELETE_CLIENT,
                    payload: alerta
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchClients = async (term) => {
        try {
            const res = await Api.searchByClient(term)
            dispatch({
                type: SEARCH_CLIENTS,
                payload:res
            })
        } catch (error) {
            
        }
    }

    return (
        <clientContext.Provider
            value={{
                total: state.total,
                clients: state.clients,
                client: state.client,
                message: state.message,
                loading: state.loading,
                getClients,
                addClient,
                editClient,
                updateClient,
                deleteClient,
                restoreClient,
                searchClients
            }}
        >
            {props.children}
        </clientContext.Provider>
    )
}

export default ClientState;