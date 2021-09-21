/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
/**
 * MATERIAL UI
 */
import { green, red } from '@material-ui/core/colors';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


/**
 * Boostrap
 */
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons'



import '../css/Users.css'
import { map } from 'lodash'

import Api from '../utils/api'
import Moment from 'react-moment'
import moment from 'moment'
import AuthContext from '../Context/Auth/authContext'
import TransactionContext from '../Context/Transaction/transactionContext'
import ModalFilterClients from '../components/Modals/ModalFilterClients'
import AddTransaction from '../components/Modals/AddTransaction';

const Transactions = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const transactionContext = useContext(TransactionContext)
    const { total, from, to, transactions, loading, message, updateFilters, getTransactions } = transactionContext;
    const [newFrom, setFrom] = useState(moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    const [newTo, setTo] = useState(moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    //     const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    // const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
    const [showModalClient, setShowModalClient] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {

        (async () => {
            await getTransactions(newFrom, newTo)
        })()
    }, [loading, message])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const closeModalClient = () => {
        setShowModalClient(false)
    }

    const onFocusClients = () => {
        setShowModalClient(true)
    }

    const updateDates = (newFrom, newTo) => {
        updateFilters(newFrom, newTo);
    }

    const downloadExcel = async () => {
        const res = await Api.downLoadExcel(newFrom, newTo);
        console.log('RES +', res)
    }

    const edit = () => {

        setModalShow(true)
    }

    const closeModal = async () => {
        await getTransactions(newFrom, newTo)
        setModalShow(false)
    }

    return (
        <div className="px-10 pb-16 pt-4 h-full overflow-auto text-base">
            <div className="flex flex-col lg:flex-row justify-between  items-stretch sm:items-center print:items-start mb-4">
                <div>
                    <h1 className="text-3xl font-bold">Transacciones </h1>
                    <p >Total {total}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-end mt-2 mb-6 print:hidden">
                    {/* {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
                        <Form.Label>Compañias</Form.Label>
                        <Form.Control type="text" name='company' value='GC COM'  />
                    </Form.Group> : null
                    }
                    {user.role !== 'CLIENT' && <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
                        <Form.Label>Clientes</Form.Label>
                        <Form.Control type="text" name='client' value='CRAYOLA' onClick={()=>onFocusClients()}  />
                    </Form.Group>} */}
                    <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control type="date" name='inicio' value={newFrom} onChange={(e) => setFrom(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
                        <Form.Label>Fecha de final</Form.Label>
                        <Form.Control type="date" name='fin' value={newTo} onChange={(e) => setTo(e.target.value)} />
                    </Form.Group>


                    <div className="flex flex-col justify-end mx-1 sm:mx-1 my-2 sm:my-0">
                        <Button variant="primary" onClick={() => updateDates(newFrom, newTo)} >
                            Buscar
                        </Button>
                    </div>
                </div>


            </div>
            <div className="flex flex-col md:flex-row justify-end mt-2 mb-6">
                <Tooltip title="Descargar Excel" placement="bottom">
                    <Button variant="success" onClick={() => downloadExcel()}  className="m-1">
                        <FontAwesomeIcon icon={faFileExcel} color='white' className="text-base" />
                        <span className="text-white mx-2">Descargar</span>
                    </Button>
                </Tooltip>
                {user.role !== 'CLIENT' ?
                    <Tooltip title="Agregar transacción" placement="bottom">
                        <Button variant="primary" onClick={() => edit()}  className="m-1">
                            <FontAwesomeIcon icon={faPlus} color='white' className="text-base" />
                            <span className="text-white mx-2">Agregar transacción</span>
                        </Button>
                    </Tooltip>
                    : null}

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

                                <th className="uppercase">Producto</th>
                                <th className="uppercase text-center">Cantidad</th>
                                <th className="uppercase text-center" >Fecha</th>
                                <th className="uppercase text-center">Código</th>
                                {user.role === "SUPER_ADMIN" || user.role === "SUPPORT" ? <th className="uppercase">Compañía</th> : null}
                                <th className="uppercase">Cliente</th>

                                <th className="uppercase">Registro</th>
                                <th className="uppercase text-center">Status</th>

                            </tr>
                        </thead>
                        <tbody className="text-base">

                            {map(transactions, (transaction, index) => {
                                return (
                                    <tr key={transaction._id} >
                                        <td className="align-middle text-sm">{index + 1}</td>
                                        <td className="align-middle text-sm">{transaction.product_name}</td>
                                        <td className="align-middle text-sm text-center">{transaction.status ? <span style={{ color: green[500] }}>+ {transaction.cnt}</span> : <span style={{ color: red[500] }}>- {transaction.cnt}</span>}</td>
                                        <td className="align-middle text-sm text-center">{transaction.timestamp && moment(transaction.timestamp).format('DD/MM/YYYY HH:mm a')}</td>
                                        <td className="align-middle text-sm text-center">{transaction.code}</td>
                                        {user.role === "SUPER_ADMIN" || user.role === "SUPPORT" ? <td className="align-middle text-sm">{transaction.company.name}</td> : null}
                                        <td className="align-middle text-sm">{transaction.client.name}</td>
                                        <td className="align-middle text-sm">{transaction.user?.name}</td>
                                        <td className="align-middle text-sm text-center">{transaction.status ? <ArrowUpwardIcon style={{ color: green[500] }} /> : <ArrowDownwardIcon color="error" />}</td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>


                }
                {!loading && transactions.length === 0 && <div className="text-center py-5">
                    <h5>No hay registros para mostrar del {from} - {to}</h5>

                </div>}
            </div>
            <AddTransaction show={modalShow} onHide={() => { closeModal() }} />
        </div>
    )
}
export default Transactions;