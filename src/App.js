/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from './pages/Dashoard';
import Login from './pages/login';
import Users from './pages/Users'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Collections from './pages/Collections'
import Locations  from  './pages/Locations'
import Reports from './pages/Reports'
import Transactions from './pages/Transactions'
import Companies from './pages/Companies'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'


import AuthState from './Context/Auth/authState';
import AlertState from './Context/Alerta/alertState';
import UserState from './Context/User/userState';
import ProductState from './Context/Products/productState';
import LocationState from './Context/Location/locationState';
import ClientState from './Context/Client/clientState';
import TransactionState from './Context/Transaction/transactionState';
import CompanyState from './Context/Companies/companyState';

import RutaSuperPrivada from './components/rutas/rutasSuperAdmin';
import RutaPrivada from './components/rutas/rutaPrivada';


const App = () => {

  const token = localStorage.getItem('token')

  return (
    <AlertState>
      <AuthState>
        <CompanyState>
          <UserState>
            <ProductState>
              <LocationState>
                <ClientState>
                  <TransactionState>
                    <Router>
                      <Switch>
                        <Route exact path="/" component={Login} />

                        <RutaPrivada exact path="/dashboard" component={Dashboard} />
                        <RutaSuperPrivada exact path="/companies" component={Companies} />
                        <RutaPrivada exact path="/users" component={Users} />
                        <RutaPrivada exact path="/users/:id" component={Users} />

                        <RutaPrivada exact path="/transactions" component={Transactions} />

                        <RutaPrivada exact path="/products" component={Products} />
                        <RutaPrivada exact path="/locations" component={Locations} />

                        <RutaPrivada exact path="/clients" component={Clients} />

                        <RutaPrivada exact path="/reports" component={Reports} />

                      </Switch>



                    </Router>
                  </TransactionState>
                </ClientState>
              </LocationState>
            </ProductState>
          </UserState>
        </CompanyState>
      </AuthState>
    </AlertState>
  )
}
export default App;