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
    ACTIVE_COMPANY
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
            }

        } catch (error) {

        }
    }

    const addCompany = async (args) => {
        try {

            const res = await Api.postCompany(args)

            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha agregado ${res.data.company_name} exitosamente`,
                    categoria: 'success'
                }
                dispatch({
                    type: ADD_COMPANY,
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
                    msg: `Se ha actualizado ${res.company.company_name} exitosamente`,
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

    const activatedCompany = async (id) => {
        try {
            const res = await Api.activateCompany(id)
        
            if (res.msg === "done") {
                const alerta = {
                    msg: `Se ha reactivado ${res.companyActivated.company_name} exitosamente`,
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
                    msg: `La compañia ${res.companyDeleted.company_name} a sido eliminada exitosamente`,
                    categoria: 'info'
                }
                dispatch({
                    type: DELETE_COMPANY,
                    payload: alerta
                })
            }
        } catch (error) {
            console.log(error)
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
                activatedCompany

            }}
        >
            {props.children}
        </companyContext.Provider>
    )
}

export default CompanyState;