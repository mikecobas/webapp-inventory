/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import locationContext from './locationContext';
import locationReducer from './locationReducer'
import Api from '../../utils/api'

import {
    GET_LOCATIONS,
    GET_LOCATION,
    EDIT_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    ADD_LOCATION
} from '../../types';



const LocationState = props => {
    const initialState = {
        total: 0,
        locations: [],
        location: null,
        message:null,
        loading: true
    }

    const [state, dispatch] = useReducer(locationReducer, initialState);


    const getLocations = async() => {
        try {
            const res = await Api.getCategories()
            console.log(res)
            if (res.msg === "Categories") {
                dispatch({
                    type: GET_LOCATIONS,
                    payload:res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLocation = async (id) => {
        try {
            const res = await Api.deleteCategories(id)
            console.log(res)
            if (res.msg === "done") {
                const alerta = {
                msg: `Se ha eliminado ${res.categoryDeleted.name} exitosamente`,
                categoria: 'success'
            }
                dispatch({
                    type: DELETE_LOCATION,
                    payload:alerta
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addLocation = async (args) => {
        try {
            const res = await Api.postLocation(args);
            if (res.msg === 'done') {
                const alerta = {
                msg: `Se Agrego ${res.data.name} exitosamente`,
                categoria: 'success'
                }
                res.alerta = alerta
                dispatch({
                    type: ADD_LOCATION,
                    payload:alerta
                })
            }
            if (res.msg !== 'done') {
                const alerta = {
                msg: res.msg,
                categoria: 'danger'
                }
                res.alerta = alerta
                dispatch({
                    type: ADD_LOCATION,
                    payload:alerta
                })
            }
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.res.msg,
                categoria: 'danger'
                }
                dispatch({
                    type: ADD_LOCATION,
                    payload:alerta
                })
        }
    }

    return (
        <locationContext.Provider
            value={{
                total: state.total,
                locations: state.locations,
                location: state.location,
                message:state.message,
                loading: state.loading,
                getLocations,
                deleteLocation,
                addLocation
            }}
        >
            {props.children}
        </locationContext.Provider>
    )
    
}

export default LocationState;