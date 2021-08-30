/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
/**
 * MATERIAL UI
 */
import { green, red } from '@material-ui/core/colors';
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * Boostrap
 */
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Spinner from 'react-bootstrap/Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

import Form from "react-bootstrap/Form";

import '../css/Users.css'
import { map } from 'lodash'

import Api from '../utils/api'
import Moment from 'react-moment'
import moment from 'moment'
import TransactionContext from '../Context/Transaction/transactionContext'

const Transactions = () => {

    const transactionContext = useContext(TransactionContext)
    const { total, from, to, transactions, loading, message, updateFilters, getTransactions } = transactionContext;
    const [newFrom, setFrom] = useState(moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    const [newTo, setTo] = useState(moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    //     const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    // const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {

        (async () => {
            await getTransactions(newFrom, newTo)
        })()
    }, [loading, message])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const updateDates = (newFrom, newTo) => {
        updateFilters(newFrom, newTo);
    }

    const downloadExcel = async () => {
        const res = await Api.downLoadExcel(from, to);
        console.log('RES +', res)
    }

    return (
        <div className="p-20 h-screen">
            <div className="flex flex-col lg:flex-row justify-between  items-stretch sm:items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold">Transacciones </h1>
                    <p >Total {total}</p>   
               </div>
                <div className="flex flex-col md:flex-row justify-end mt-2 mb-6">
                    <Form.Control className="mx-2 my-2 sm:my-0" type="date" name='inicio' value={newFrom} onChange={(e) => setFrom(e.target.value)} />
                    <Form.Control className="mx-2 my-2 sm:my-0" type="date" name='fin' value={newTo} onChange={(e) => setTo(e.target.value)} />
                    <div className="flex flex-col justify-end mx-0 sm:mx-2 my-2 sm:my-0">
                        <Button variant="primary" onClick={() => updateDates(newFrom, newTo)} >
                            Buscar
                        </Button>
                    </div>
                </div>


            </div>
            <div className="flex flex-col md:flex-row justify-end mt-2 mb-6">
                <Tooltip title="Descargar Excel" placement="bottom">

                    <Button variant="success" onClick={() => downloadExcel()} >
                        <FontAwesomeIcon icon={faFileExcel} color='white' className="text-xl" />
                        <span className="text-white mx-1 hidden sm:contents">  Descargar Excel</span>
                    </Button>
                </Tooltip>

            </div>
            <div className="rounded-3xl shadow p-4 max-h-full  overflow-scroll">
                {loading && <div className=" text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
                {!loading && transactions &&
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

                            {map(transactions, (transaction, index) => {
                                return (
                                    <tr key={transaction._id} >
                                        <td className="align-middle">{index + 1}</td>
                                        <td className="align-middle">{transaction.product.name}</td>
                                        <td className="align-middle">{transaction.status ? <span style={{ color: green[500] }}>+ ${transaction.cnt}</span> : <span style={{ color: red[500] }}>- ${transaction.cnt}</span>}</td>
                                        <td className="align-middle">{transaction.date}</td>
                                        <td className="align-middle">{transaction.product.code}</td>
                                        <td className="align-middle">{transaction.product.client.company_name}</td>
                                        <td className="align-middle">{transaction.user.name}</td>
                                        <td className="align-middle">{transaction.status ? <ArrowUpwardIcon style={{ color: green[500] }} /> : <ArrowDownwardIcon color="error" />}</td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                
                
                }
                {!loading && transactions.length ===0 && <div className="text-center py-5">
                    <h5>No hay registros para mostrar del {from} - { to }</h5>

                </div>}
            </div>
        </div>
    )
}
export default Transactions;