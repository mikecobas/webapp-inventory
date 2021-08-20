/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { green, red } from '@material-ui/core/colors';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import '../css/Users.css'
import {map} from 'lodash'
import Api2 from '../utils/api'
import Moment from 'react-moment'
import moment from 'moment'

const Transactions = () => {
  
    const [from, setFrom] = useState(moment().format('DD-MM-YYYY'))
    const [to, setTo] = useState(moment().add(2,'d').format('DD-MM-YYYY'))
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
           
            console.log(from)
            console.log(to)
            const items = await Api2.getTransactions('01-01-2021',to);
            
            setTransactions(items.transactions)
            console.log(transactions)
            setTotal(items.total)
         
        })()
    }, [])


    return (
        <div  className="p-20 h-screen">
            <h1 className="text-3xl mb-6 font-bold">Transacciones</h1>
            <div className="rounded-3xl shadow p-4 max-h-full  overflow-scroll ">
            <Table hover responsive > 
  <thead>
    <tr>
      <th>#</th>
      
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Código</th>
                            <th>Compañia</th>
                            <th>Registro</th>
                            <th>Status</th>

    </tr>
  </thead>
  <tbody >

    {map(transactions, (transaction,index) => {
        return (
            <tr key={transaction._id} >
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">{transaction.product.name}</td>
                <td className="align-middle">{transaction.status ? <span style={{ color: green[500] }}>+ ${transaction.cnt}</span>: <span style={{ color: red[500] }}>- ${transaction.cnt}</span>}</td>
                <td className="align-middle">{transaction.date}</td>
                <td className="align-middle">{transaction.product.code}</td>
                <td className="align-middle">{transaction.product.client.company_name}</td>
                <td className="align-middle">{transaction.user.name}</td>
                <td className="align-middle">{ transaction.status ? <ArrowUpwardIcon style={{ color: green[500] }}/> : <ArrowDownwardIcon color="error"/>}</td>

            </tr>
          )
      })}
    
  </tbody>
</Table>
           </div>
            </div>
    )
}
export default Transactions;