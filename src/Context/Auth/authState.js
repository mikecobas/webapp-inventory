import { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import Api from '../../utils/api'

import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

const AuthState = (props) => {
    //STATE INICIAL
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')),
        message: null,
        token: localStorage.getItem('token'),
        autenticado: null
    };

    // Dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await Api.auth(datos)
            console.log(respuesta)
            if (!respuesta.msg) {
                dispatch({
                    type: REGISTRO_EXITOSO,
                    payload: respuesta
                })
                usuarioAutenticado(respuesta)
            } else {
                const alerta = {
                    msg: respuesta.msg,
                    categoria: 'danger'
                }

                dispatch({
                    type: REGISTRO_ERROR,
                    payload: alerta


                })
            }
        } catch (error) {
         
            const alerta = {
                msg: error.respuesta.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta


            })
        }


    }

    // Obtener datos de usuario

    const usuarioAutenticado = async (userData) => {
         
        try {
            dispatch({
                type: OBTENER_USUARIO,
                payload: userData
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider value={{
            user: state.user,
            token: state.token,
            autenticado: state.autenticado,
            message: state.message,
            registrarUsuario,
            usuarioAutenticado,
            cerrarSesion

        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;