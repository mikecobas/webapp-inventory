//import useState hook to create menu collapse state
import React, { useState, useEffect } from "react";
import { NavLink,  }  from 'react-router-dom'
import {Redirect} from 'react-router'
import {
  useHistory,
} from "react-router-dom";
//import icons from react icons

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import FeaturedPlayListRoundedIcon from '@material-ui/icons/FeaturedPlayListRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';


const Sidebar = (props) => {
  const { collapse, setCollapse } = props;
  const [profile, setProfile] = useState({
    name: '',
    image: '',
  })
  
  useEffect(() => {
    (async () => {
      const user = await JSON.parse(localStorage.getItem('user'));
      setProfile(user)
      console.log(user.name)
      console.log(profile.image)
    })()
  }, [])


  let history = useHistory();

    const logout = async () => {
    
    await localStorage.clear()
    history.push("/")

  }
  const menuCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <>
      <div className="bg-white h-full flex flex-col justify-start	border-r">
        <div className={!collapse ? "py-4 flex flex-row items-center justify-end " : "py-4 flex flex-row items-center justify-center "}>
        <IconButton arial-label="menu" className="mx-4" onClick={menuCollapse}>
          <MenuIcon />
        </IconButton>
        </div>
        <div className={!collapse ? "bg-gray-100 pt-1 px-2 pb-2 rounded-xl flex justify-center items-center mx-4" : "bg-gray-100 pt-1 px-2 pb-2 rounded-xl flex justify-center items-center mx-2 "}>
          {profile.image !== '' ? <img className="rounded w-10 my-2 " src={ profile.image} alt="avatar"/> : <AccountCircleIcon fontSize='large'/>}
         
       {!collapse && <h2 className="text-lg mx-3  my-2 ">{ profile.name}</h2> }   
        </div>
        <nav className="flex flex-col pt-8 flex-1">
          {/* <NavLink to="/dashboard" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"> <DashboardRoundedIcon /> Dashboard</NavLink> */}
          <NavLink to="/users" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"> <GroupRoundedIcon /> {!collapse && ' Usuarios' }</NavLink>
          <NavLink to="/collections" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"><FeaturedPlayListRoundedIcon />{!collapse &&  ' Coleciones'}</NavLink>
          <NavLink to="/products" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"><ListAltRoundedIcon /> {!collapse && ' Products'} </NavLink>
          <NavLink to="/clients" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"><BusinessRoundedIcon /> {!collapse && ' Clients'} </NavLink>
          <NavLink to="/transactions" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"><SwapHorizIcon /> {!collapse && ' Transacciones'} </NavLink>
          <NavLink to="/reports" className={!collapse ? "pl-7 py-3 hover:bg-blue-100 no-underline	text-gray-500":"pl-4 py-3 hover:bg-blue-100 no-underline	text-gray-500"} activeClassName="text-blue-400"><AssessmentIcon /> {!collapse && ' Reportes'} </NavLink>
       </nav>
        <div className={!collapse ? " py-3 px-3 hover:bg-blue-100 flex flex-row items-center justify-end": " py-3 px-3 hover:bg-blue-100 flex flex-row items-center justify-center" } onClick={logout}>
          <ExitToAppRoundedIcon />{!collapse && <span className="mx-2" > Cerrar sesion</span>}

        </div>
    </div>
    </>
  );
};

export default Sidebar;