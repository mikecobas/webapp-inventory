/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../css/Users.css'
import { map } from 'lodash'
import Alert from 'react-bootstrap/Alert'
import ClientsModal from '../components/Modals/ClientsModal';

import AuthContext from '../Context/Auth/authContext'
import AlertContext from '../Context/Alerta/alertContext';
import ClientContext from '../Context/Client/clientContext';

const Clients = () => {
    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;

    const clientContext = useContext(ClientContext);
    const { clients, loading, message, getClients, deleteClient, editClient } = clientContext
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        (async () => {
            await getClients()

            if (message) {
                mostrarAlerta(message.msg, message.categoria);
            }

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

    return (
        <div className="p-20 h-full relative">
            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}
            <h1 className="text-3xl mb-6 font-bold">Clientes</h1>
            <div className="rounded-3xl shadow p-4 max-h-full overflow-scroll ">
                <div className="flex flex-row justify-end mt-2 mb-6">
                    <Button color="primary" variant="contained" onClick={() => edit()} >
                        Agregar Cliente
                    </Button>
                </div>
                <Table hover responsive >
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Compañia</th>
                            <th>RFC</th>
                            <th>Dirección</th>
                            <th>Tel</th>
                            <th>Cel</th>
                            <th>Email</th>
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
                                    <td className="align-middle">{client.company_name}</td>
                                    <td className="align-middle">{client.rfc}</td>
                                    <td className="align-middle">{client.address}</td>
                                    <td className="align-middle">{client.phone}</td>
                                    <td className="align-middle">{client.cel}</td>
                                    <td className="align-middle">{client.email}</td>
                                    <td className="align-middle text-center">{client.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                    <td className="align-middle">{client.name}</td>
                                    <td className="align-middle">{client.user.name}</td>

                                    <td className="align-middle text-right">
                                        {user.role === 'SUPER_ADMIN' ?
                                            <IconButton aria-label="editar" color="primary" onClick={() => edit(client)}>
                                                <EditIcon />
                                            </IconButton>
                                            : ''}
                                        {client.status ?
                                            <IconButton aria-label="editar" color="secondary" onClick={() => removeClient(client._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            : ''}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
            <ClientsModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Clients;