/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/Users.css'
import { map } from 'lodash'
import Alert from 'react-bootstrap/Alert'
import UserModal from '../components/Modals/UserModal'

import AuthContext from '../Context/Auth/authContext'
import UserContext from '../Context/User/userContext';
import AlertContext from '../Context/Alerta/alertContext';

const Users = () => {

    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const userContext = useContext(UserContext)
    const { total, users, message, loading, getUsers, deleteUser } = userContext;

    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        (async () => {
            await getUsers()
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }

        })()
    }, [loading, message])

    const edit = (item) => {

       
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }


    const removeUser = async (id) => {
        await deleteUser(id)
    }

    return (
        <div className="px-20  h-screen">
            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}
            <h1 className="text-3xl my-6 font-bold">Usuarios</h1>
            <h4 className="text-2xl mb-3 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 my-2  h-5/6 overflow-scroll">
                <div className="flex flex-row justify-end mt-2 mb-6">
                    <Button color="primary" variant="contained" onClick={() => edit()} >
                        Agregar usuario
                    </Button>
                </div>
                <Table hover responsive  >
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Nombre</th>
                            <th>Correo</th>
                            <th className="text-center">Status</th>
                            <th>Rol</th>
                            <th>Compañia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="h-5/6 overflow-scroll" >

                        {users && map(users, (item, index) => {
                            return (
                                <tr key={item._id} >
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="align-middle">{item.email}</td>
                                    <td className="align-middle text-center">{item.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                    <td className="align-middle">{item.role ==='CLIENT' ? 'Cliente' : item.role ==='USER'?  'Empleado' : item.role ==='ADMIN' ? 'Administrador' : 'Super Admin'}</td>
                                    <td className="align-middle">{item.client ? item.client.company_name : 'N/A'}</td>
                                    <td className="align-middle">
                                        {/* <IconButton aria-label="editar" color="primary" onClick={() => edit(product)}>
                                            <EditIcon />
                                        </IconButton> */}
                                        {item.status && user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ?
                                            <IconButton aria-label="delete" color="secondary" onClick={() => removeUser(item.uid)}>
                                                <DeleteIcon />
                                            </IconButton> : ''}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
            <UserModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Users;