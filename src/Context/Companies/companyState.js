/* eslint-disable import/no-anonymous-default-export */
import { useReducer } from 'react';
import companyContext from './companyContext';
import companyReducer from './companyReducer';
import Api from '../../utils/api'

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


const CompanyState = props => {
    const initialState = {
        total: 0,
        companies: [],
        company: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(companyReducer, initialState);

    const getCompanies = async () => {
        try {
            const res = await Api.getCompanies()
            if (res.msg === 'done') {
                dispatch({
                    type: GET_COMPANIES,
                    payload: res
                })
            } else {
                const alerta = {
                    msg: 'ALGO SALIO MAL, INTENTA MAS TARDE',
                    categoria:'warning'
                }
                dispatch({
                    type: ERROR_COMPANIES,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const addCompany = async (args) => {
        try {

            const res = await Api.postCompany(args)

            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha agregado ${res.data.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: ADD_COMPANY,
                    payload: alerta
                })
            } else {
                const alerta = {
                    msg: 'ALGO SALIO MAL, INTENTA MAS TARDE',
                    categoria: 'warning'
                }
                dispatch({
                    type: ERROR_COMPANIES,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const updateCompany = async (id,args) => {
        try {
            const res = await Api.updateCompany(id,args)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha actualizado ${res.company.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_COMPANY,
                    payload: alerta
                })
            } else {
                const alerta = {
                    msg: `No pudimos actualizar ${args.name}, intenta más tarde`,
                    categoria:'warning'
                }
                dispatch({
                    type: ERROR_COMPANIES,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const activatedCompany = async (id) => {
        try {
            const res = await Api.activateCompany(id)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha reactivado ${res.companyActivated.name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: UPDATE_COMPANY,
                    payload: alerta
                })
            }

        } catch (error) {

        }
    }

    const editCompany = async (args) => {
        try {

                dispatch({
                    type: EDIT_COMPANY,
                    payload: args
                })


        } catch (error) {

        }
    }

    const deleteCompany = async (id) => {
        try {
            const res = await Api.deleteCompany(id)
            console.log(res)
            if (res.msg === "done") {
                const alerta = {
                    msg: `La compañia ${res.companyDeleted.name} a sido eliminada exitosamente`,
                    categoria: 'info'
                }
                dispatch({
                    type: DELETE_COMPANY,
                    payload: alerta
                })
            } else {
                const alerta = {
                    msg: `No se pudo eliminar la empresa`,
                    categoria:'warning'
                }
                dispatch({
                    type: ERROR_COMPANIES,
                    payload: alerta
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchCompany = async (term) => {
        try {
            const res = await Api.searchByCompany(term)
            dispatch({
                type: SEARCH_COMPANIES,
                payload:res
            })
        } catch (error) {
            
        }
    }

    return (
        <companyContext.Provider
            value={{
                total: state.total,
                companies: state.companies,
                company: state.company,
                message: state.message,
                loading: state.loading,
                getCompanies,
                addCompany,
                deleteCompany,
                editCompany,
                updateCompany,
                activatedCompany,
                searchCompany

            }}
        >
            {props.children}
        </companyContext.Provider>
    )
}

export default CompanyState;