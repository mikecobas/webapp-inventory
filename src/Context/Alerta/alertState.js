/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext'
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

const AlertState = props => {
    const initialState = {
        alerta:null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
            type: OCULTAR_ALERTA
        });
        }, 5000);
    }
    
    return (
        <alertContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
        }} 
        >
            {
                props.children
            }
        </alertContext.Provider>
    )

}


export default AlertState
