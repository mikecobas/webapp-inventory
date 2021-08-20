/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/Users.css'
import {map} from 'lodash'
import Api2 from '../utils/api'

const Users = () => {
  
    const [total, setTotal] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        (async () => {
            const listUsers = await Api2.getUsers();
            console.log(listUsers)
            setUsers(listUsers.users)
            setTotal(listUsers.total)
         
        })()
    }, [])


    return (
        <div  className="p-20 h-screen">
            <h1 className="text-3xl mb-6 font-bold">Usuarios</h1>
            <div className="rounded-3xl shadow p-4 h-full overflow-scroll ">
            <Table hover responsive > 
  <thead>
    <tr>
      <th>#</th>
      
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Status</th>
                            <th>Rol</th>
                            <th></th>
    </tr>
  </thead>
  <tbody className="h-screen" >

    {users && map(users, (user,index) => {
        return (
            <tr key={user._id} >
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">{user.name}</td>
                <td className="align-middle">{ user.email}</td>
                <td className="align-middle">{ user.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                <td className="align-middle">{user.role.replace('_', ' ').toLowerCase()}</td>
                <td className="align-middle">
                    {user.status ?
                        <Button
                            variant="contained"
                            color="secondary"
                            size="sm"
                            startIcon={<DeleteIcon />}
                        >
                            Borrar
                        </Button>  : ''}
                </td>
            </tr>
          )
      })}
    
  </tbody>
</Table>
           </div>
            </div>
    )
}
export default Users;