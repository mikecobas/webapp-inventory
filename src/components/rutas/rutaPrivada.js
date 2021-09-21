/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../Context/Auth/authContext'
import Sidebar from '../Sidebar/Sidebar'
import Alert from '@mui/material/Alert';


const RutaPrivada = ({ component: Component, ...props }) => {
    const authContext = useContext(AuthContext)
    const { autenticado, token, user } = authContext;
    const [collapse, setCollapse] = useState(true)
    return (
        <Route {...props} render={props => !token ? (
            <Redirect to="/" />

        ) : (
            <>
                <div className="flex h-full  print:text-sm">
                        <div className={!collapse ? "w-2/12 h-screen" : "w-16 h-screen"}>
                        <Sidebar collapse={collapse} setCollapse={setCollapse} />
                    </div>
                        <div className={!collapse ? "w-full h-screen border-l print:w-full" : "w-full border-l h-screen print:w-full"}>
                            {process.env.REACT_APP_ENV === 'dev' ? <Alert severity="info" className="flex">Ambiente demo</Alert> : null}
                        <Component {...props} />
                    </div>
                </div>
            </>
        )} />
    )
}

export default RutaPrivada