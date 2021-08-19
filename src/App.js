/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Redirect} from 'react-router'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Dashboard  from './pages/dashoard';
import Login from './pages/login';
import Users from './pages/Users'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Collections from './pages/Collections'
import Reports from './pages/Reports'
import Transactions from './pages/Transactions'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

const App = () => {
  const [collapse, setCollapse] = useState(false)

  const token = localStorage.getItem('token')
  console.log(token)
  return (
    <div className="flex h-screen">
      <Router>
        {token &&
          <div className={!collapse? "w-2/12" : "w-16"}>
            <Sidebar collapse={collapse} setCollapse={setCollapse} />
          </div>}
        {token ?
          <div className={!token ? "w-screen" :  !collapse ? "w-10/12" :"w-11/12"}>
    
            <Route exact path="/"  >
            {token ? <Redirect   to="/users" /> : <Login />}
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>        
            {/* <Route exact path="/dashboard">
              <Dashboard />
            </Route> */}
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/collections">
              <Collections />
            </Route>
            <Route path="/clients">
              <Clients />
            </Route>
            <Route path="/reports">
              <Reports />
            </Route>
           
          
            
         
          </div>
          :
          <Route exact path="/"  >
              <Login />
            </Route>
          }
      </Router>
    </div>
  )
}
export default App;