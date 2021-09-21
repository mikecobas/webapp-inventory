/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
/***
 * MATERIAL UI
 */
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import { green, red } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
/**
 * Boostrap
 */
import Table from 'react-bootstrap/Table'
import Overlay from 'react-bootstrap/Overlay'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
/**
 * COMPONENTES
 */
import ClientsModal from '../components/Modals/ClientsModal';
/**
 * CONTEXTS
 */
import AuthContext from '../Context/Auth/authContext'
import AlertContext from '../Context/Alerta/alertContext';
import ClientContext from '../Context/Client/clientContext';

const Clients = () => {
    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;

    const clientContext = useContext(ClientContext);
    const {
        total,
        clients,
        loading,
        message,
        getClients,
        deleteClient,
        editClient,
        restoreClient,
        searchClients
    } = clientContext
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        (async () => {

            if (searchTerm !== '') {
                await searchClients(searchTerm)
            } else {
                await getClients()
            }

            if (message) {
                mostrarAlerta(message.msg, message.categoria);
            }
            console.log(clients)
        })()
    }, [loading, message])


    const edit = (client) => {
        console.log(client)
        editClient(client)
        setModalShow(true)
    }

    const closeModal = () => {
        editClient()
        setModalShow(false)
    }

    const removeClient = async (id) => {
        await deleteClient(id)
    }
    const recoverClient = async (id) => {
        await restoreClient(id)
    }

    const search = async () => {
        if (searchTerm !== '') {
            await searchClients(searchTerm)
        } else {
            await getClients()
        }
    }

    return (
        <div className="px-10 h-full overflow-auto relative">
            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}
                <h1 className="text-3xl mb-6 font-bold">Clientes</h1>
            <h4 className="text-2xl mb-6 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 max-h-full overflow-scroll ">
            <div className="flex flex-row justify-between mt-2 mb-6">
                    <div>
                        <Form className="flex flex-row">
                            <Form.Group className="mx-2" controlId="name">
                                <Form.Control type="text" placeholder="Buscar clientes" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </Form.Group>
                            <Button color="primary" variant="outlined" onClick={() => search()}>
                                Buscar
                            </Button>
                        </Form>
                    </div>
                    <Button color="primary" variant="contained" onClick={() => edit()} >
                        Agregar Cliente
                    </Button>
                </div>
                {loading && <div className=" text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
                {!loading && clients &&
                    <Table hover responsive >
                        <thead>
                            <tr>
                                <th>#</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Compañía</th> : null}
                                <th>Cliente</th>
                                <th>RFC</th>
                                {/* <th>Dirección</th> */}
                                <th className="">Datos de contacto</th>

                                <th className="text-center">Status</th>
                                <th>Responsable</th>
                                <th>Actualizado por</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >

                            {map(clients, (client, index) => {
                                return (
                                    <tr key={client._id} >
                                        <td className="align-middle">{index + 1}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?
                                            <td className="align-middle">{client.company.name}</td>
                                            : null}
                                        <td className="align-middle">{client.name}</td>
                                        <td className="align-middle">{client.rfc}</td>
                                        <td className="flex flex-col justify-center">
                                            <span className="my-2"><PhoneIcon fontSize="small" /> {client.phone ? client.phone : 'N/A'}</span>
                                            <span className="my-2"><PhoneIphoneIcon fontSize="small" /> {client.cel ? client.cel : 'N/A'}</span>
                                            <span className="my-2"><MailOutlineIcon fontSize="small" />  {client.email ? client.email : 'N/A'}</span>
                                        </td>

                                        <td className="align-middle text-center">{client.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon style={{ color: red[500] }} />}</td>
                                        <td className="align-middle">{client.contact_name}</td>
                                        <td className="align-middle">{client.user.name}</td>

                                        <td className="align-middle text-right">
                                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' || user.role === 'ADMIN' ?
                                                <IconButton aria-label="editar" color="primary" onClick={() => edit(client)}>
                                                    <EditIcon />
                                                </IconButton>
                                                : ''}
                                            {client.status ?
                                                <Tooltip title="Borrar cliente" placement="bottom">
                                                    <IconButton aria-label="editar" color="secondary" onClick={() => removeClient(client._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                : null}
                                            {!client.status && user.role === 'SUPER_ADMIN' || !client.status && user.role === 'SUPER_ADMIN' ?
                                                <Tooltip title="Recuperar cliente" placement="bottom">
                                                    <IconButton aria-label="editar" color="primary" onClick={() => recoverClient(client._id)}>
                                                        <RestoreFromTrashIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                : null}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>}
                {!loading && clients.length === 0 && <div className="text-center py-5">
                    {searchTerm === '' ? 
                        <h5>No cuentas con clientes dados de alta</h5> :
                        <h5 className="font-normal">No se encontro resultados de busqueda con <span className="font-bold">" { searchTerm} "</span></h5>
                    }

                </div>}
            </div>
            <ClientsModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Clients;