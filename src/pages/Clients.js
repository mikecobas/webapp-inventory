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

const Clients = () => {
  
    const [total, setTotal] = useState();
    const [clients, setClients] = useState();

    useEffect(() => {
        (async () => {
            const listClients = await Api2.getClients();
            console.log(listClients)
            setClients(listClients.clients)
            setTotal(listClients.total)
         
        })()
    }, [])


    return (
        <div  className="p-20 h-screen">
            <h1 className="text-3xl mb-6 font-bold">Clientes</h1>
            <div className="rounded-3xl shadow p-4 max-h-full overflow-scroll ">
            <Table hover responsive > 
  <thead>
    <tr>
      <th>#</th>
      
                            <th>Compañia</th>
                            <th>RFC</th>
                            <th>Dirección</th>
                            <th>Tel</th>
                            <th>Cel</th>
                            <th className="text-center">Status</th>
                            <th>Responsable</th>
                            <th>Actualizado por</th>
                            <th></th>
    </tr>
  </thead>
  <tbody >

    {map(clients, (client,index) => {
        return (
            <tr key={client._id} >
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">{client.company_name}</td>
                <td className="align-middle">{client.rfc}</td>
                <td className="align-middle">{client.address}</td>
                <td className="align-middle">{client.phone}</td>
                <td className="align-middle">{ client.cel}</td>
                <td className="align-middle text-center">{client.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                <td className="align-middle">{client.name}</td>
                <td className="align-middle">{ client.user.name}</td>
           
                <td className="align-middle text-right">
                    {client.status ?
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
export default Clients;