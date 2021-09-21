//import useState hook to create menu collapse state
import React, { useState, useEffect, useContext } from "react";
import { NavLink, Redirect, useHistory } from 'react-router-dom'

//import icons from react icons

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import FeaturedPlayListRoundedIcon from '@material-ui/icons/FeaturedPlayListRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HomeWork from '@material-ui/icons/HomeWork'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AuthContext from "../../Context/Auth/authContext";

const Sidebar = (props) => {
  const authContext = useContext(AuthContext)
  const { user, cerrarSesion, company } = authContext;
  const { collapse, setCollapse } = props;
  const [profile, setProfile] = useState({
    name: '',
    image: '',
  })

  useEffect(() => {
    (async () => {
      // const user = await JSON.parse(localStorage.getItem('user'));
      // setProfile(user)

    })()
  }, [])


  let history = useHistory();

  const logout = async () => {

    await localStorage.clear()
    await history.push("/login")

  }
  const menuCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <>
      <div className="bg-white h-full flex flex-col justify-start	border-r print:hidden" >
        <div className={!collapse ? "flex flex-row justify-between pl-5" : "flex flex-col"}>
          <div className={!collapse ? "flex flex-row items-center justify-center" : "flex flex-row items-center justify-center "}>
            {company ?
              company.image ? <img src={company.image} width={collapse ? '60px' : '120px'} height='auto' alt={company.name} />
                : company.name ? <h5>{company.name}</h5> : null : null}
          </div>
          <div className={!collapse ? "py-2 flex flex-row items-center justify-end " : "py-2 flex flex-row items-center justify-center "}>

            <IconButton arial-label="menu" className="mx-4" onClick={menuCollapse}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
        <div className={!collapse ? "bg-gray-100 pt-1 px-2 pb-2 rounded-xl flex justify-center items-center mx-4" : "bg-gray-100 pt-1 px-2 pb-2 rounded-xl flex justify-center items-center mx-2 "}>
          {user.image ? <img className="rounded-full w-10 my-2 " src={user.image} alt="avatar" /> : <AccountCircleIcon fontSize='large' />}

          {!collapse && <h2 className="text-lg mx-3  my-2 ">{user.name ? user.name : null}</h2>}
        </div>
        <nav className="flex flex-col pt-8 flex-1">
          {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?
            <NavLink to="/dashboard" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"> <DashboardRoundedIcon /> {!collapse && ' Dashboard'}</NavLink>
            : <></>}
          {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?
            <NavLink to="/companies" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"> <HomeWork /> {!collapse && ' Compañias'}</NavLink>
            : <></>}
          <NavLink to="/products" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"><ListAltRoundedIcon /> {!collapse && ' Productos'} </NavLink>
          {user.role !== 'USER' && user.role !== 'CLIENT' ?
            <NavLink to="/users" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"> <GroupRoundedIcon /> {!collapse && ' Usuarios'}</NavLink>
            : <></>}
          {user.role !== 'CLIENT' ?
            <NavLink to="/locations" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"><FeaturedPlayListRoundedIcon />{!collapse && ' Ubicaciones'}</NavLink>
            : <></>}

          {user.role !== 'USER' && user.role !== 'CLIENT' ?
            <NavLink to="/clients" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"><BusinessRoundedIcon /> {!collapse && ' Clientes'} </NavLink>
            : <></>}
         
            <NavLink to="/transactions" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"><SwapHorizIcon /> {!collapse && ' Transacciones'} </NavLink>
      
          {/* <NavLink to="/reports" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start" : "pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500 flex flex-row items-center justify-start"} activeClassName="bg-blue-100 text-blue-500"><AssessmentIcon /> {!collapse && ' Reportes'} </NavLink> */}
        </nav>
        <div className={!collapse ? " py-3 px-3 hover:bg-blue-100 flex flex-row items-center justify-end" : " py-3 px-3 hover:bg-blue-100 flex flex-row items-center justify-center"} onClick={cerrarSesion}>
          <ExitToAppRoundedIcon />{!collapse && <span className="mx-2" > Cerrar sesion</span>}

        </div>
      </div>
    </>
  );
};

export default Sidebar;