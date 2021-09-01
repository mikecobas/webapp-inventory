/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../Context/Auth/authContext'
import Sidebar from '../Sidebar/Sidebar'

const RutaSuperPrivada = ({ component: Component, ...props }) => {
    const authContext = useContext(AuthContext)
    const { autenticado, token, user } = authContext;
    const [collapse, setCollapse] = useState(true)
    return (
        <Route {...props} render={props => !token ? (
            <Redirect to="/" />

        )
            :
            user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?

                (
                    <>
                        <div className="flex h-screen">
                            <div className={!collapse ? "w-2/12" : "w-16"}>
                                <Sidebar collapse={collapse} setCollapse={setCollapse} />
                            </div>
                            <div className={!collapse ? "w-10/12" : "w-11/12"}>
                                <Component {...props} />
                            </div>
                        </div>
                    </>
                )
                :
                (<Redirect to="/transactions" />)

        }
        />
    )
}

export default RutaSuperPrivada