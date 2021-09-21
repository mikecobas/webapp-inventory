/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { map } from 'lodash'
/**
 * Material ui
 */
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Bootstrap
 */
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import UserModal from '../components/Modals/UserModal'

/**
 * Contexts
 */
import AuthContext from '../Context/Auth/authContext'
import UserContext from '../Context/User/userContext';
import AlertContext from '../Context/Alerta/alertContext';

const Users = () => {

    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const userContext = useContext(UserContext)
    const { total, users, message, loading, getUsers, deleteUser, searchUsers, editUser } = userContext;

    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;
    const [searchTerm, setSearchTerm] = useState('')
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        (async () => {
            if (searchTerm) {
                await searchUsers()
            } else {
                await getUsers()
            }
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }

        })()
    }, [loading, message])

    const edit = (item) => {

        editUser(item)
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }


    const removeUser = async (id) => {
        await deleteUser(id)
    }

    const search = async () => {
        if (searchTerm !== '') {
            await searchUsers(searchTerm)
        } else {
            await getUsers()
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
            <h1 className="text-3xl my-6 font-bold">Usuarios</h1>
            <h4 className="text-2xl mb-3 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 my-2  max-h-full  overflow-scroll">
                <div className="flex flex-row justify-between mt-2 mb-6">
                    <div>
                        <Form className="flex flex-row">
                            <Form.Group className="mx-2" controlId="search">
                                <Form.Control type="text" placeholder="Buscar usuario" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </Form.Group>
                            <Button color="primary" variant="outlined" onClick={() => search()}>
                            <span className="block md:hidden">  <SearchIcon /></span>
                               <span className="hidden md:block"> Buscar</span>
                            </Button>
                        </Form>
                    </div>
                    {user.role !== 'USER' || user.role !== 'CLIENT' ? <div className="flex flex-row justify-end mt-0 md:mt-2 mb-0 md:mb-6">
                        <Button color="primary" variant="contained" onClick={() => edit()} >
                        <span className="block md:hidden">  <AddIcon /> </span>  <span className="hidden md:block">Agregar usuario</span>
                        </Button>
                    </div>: null}
                </div>

                
                {loading && <div className=" text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
                {!loading && users &&
                    <Table hover responsive  >
                        <thead>
                            <tr>
                                <th>#</th>

                                <th>Nombre</th>
                                <th>Correo</th>
                                <th className="text-center">Status</th>
                                <th>Rol</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Compañia</th> : null}
                                <th>Cliente</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Creado por</th> : null}
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Fecha de creación</th> : null}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="h-5/6 overflow-scroll" >

                            {users && map(users, (item, index) => {
                                return (
                                    <tr key={index + 1} >
                                        <td className="align-middle">{index + 1}</td>
                                        <td className="align-middle">{item.name}</td>
                                        <td className="align-middle">{item.email}</td>
                                        <td className="align-middle text-center">{item.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                        <td className="align-middle">{item.role === 'CLIENT' ? 'Cliente' : item.role === 'USER' ? 'Empleado' : item.role === 'ADMIN' ? 'Administrador' : item.role === 'SUPPOT' ? 'Soporte' : 'Super Admin'}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{item.company ? item.company.name : 'N/A'}</td> : null}
                                        <td className="align-middle">{item.client ? item.client.name : 'N/A'}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{item.created_by ? item.created_by.name : 'N/A'}</td> : null}
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{item.created_date ? `${moment(item.created_date).format('DD/MM/YY')}` : 'N/A'}</td> : null}
                                        <td className="align-middle">
                                            <IconButton aria-label="editar" color="primary" onClick={() => edit(item)}>
                                                <EditIcon />
                                            </IconButton>
                                            {item.status && user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ?
                                                <IconButton aria-label="delete" color="secondary" onClick={() => removeUser(item.uid)}>
                                                    <DeleteIcon />
                                                </IconButton> : ''}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>}

                {!loading && users.length === 0 && <div className="text-center py-5">
                    <h5>No hay usuarios</h5>

                </div>}
            </div>
            <UserModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Users;