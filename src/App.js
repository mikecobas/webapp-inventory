/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from './pages/dashoard';
import Login from './pages/login';
import Users from './pages/Users'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Collections from './pages/Collections'
import Reports from './pages/Reports'
import Transactions from './pages/Transactions'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'


import AuthState from './Context/Auth/authState';
import AlertState from './Context/Alerta/alertState';

import RutaPrivada from './components/rutas/rutaPrivada'

const App = () => {

  const token = localStorage.getItem('token')

  return (
    <AlertState>
      <AuthState>
        <Router>
         

 
             
                <Switch>
                  <Route exact path="/" component={Login} />

                  <RutaPrivada exact path="/dashboard" component={Dashboard} />
 
                  <RutaPrivada exact path="/users" component={Users} />

                  <RutaPrivada exact path="/transactions" component={Transactions} />

                  <RutaPrivada exact path="/products" component={Products} />
                  <RutaPrivada exact path="/collections" component={Collections}/>

                  <RutaPrivada exact path="/clients" component={Clients} />

                  <RutaPrivada exact path="/reports" component={Reports} />

                </Switch>
       

    
        </Router>
      </AuthState>
    </AlertState>
  )
}
export default App;