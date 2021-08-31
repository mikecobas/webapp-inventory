/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION,
    OBTENER_COMPANY
} from '../../types';



export default (state, action) => {
    //console.log(action)
    switch (action.type) {

        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            // localStorage.removeItem('token')
            localStorage.clear()
            return {
                ...state,
                token: null,
                user: null,
                autenticado:null,
                message: action.payload
            }
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                autenticado: true,
                message: null,
                token:action.payload.token
            }
        case OBTENER_USUARIO:
           localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                user: action.payload.user,
                message: null,

            }
        
        case OBTENER_COMPANY:
            localStorage.setItem('company', JSON.stringify(action.payload))
            return {
                ...state,
                company: action.payload,
                message: null,

            }
        // case CERRAR_SESION:
        //     localStorage.clear()
        //     return {
        //         ...state,
        //         token: null,
        //         isLogin: false,
        //         message: null
        //     }
        // case OBTENER_USUARIO:
        //   //  console.log(action.payload)
        //     return{
        //         ...state,
        //         token:action.payload.token,
        //         user:{
        //             name:action.payload.name,
        //             email: action.payload.email,
        //             image:  action.payload.email
        //         }
        //             }


        default:
            console.log('default')
            return state;

    }
}