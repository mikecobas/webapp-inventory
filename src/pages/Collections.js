/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/Users.css'
import { map } from 'lodash'
import Alert from 'react-bootstrap/Alert'
import moment from 'moment'
import AuthContext from '../Context/Auth/authContext'
import LocationContext from '../Context/Location/locationContext';
import AlertContext from '../Context/Alerta/alertContext';

import LocationModal from '../components/Modals/LocationModal';

const Collections = (props) => {
    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const locationContext = useContext(LocationContext)
    const { locations, total, message, loading, getLocations, deleteLocation } = locationContext;

    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        (async () => {
            await getLocations()
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }
        })()
    }, [loading, message])

    const edit = (location) => {
        console.log(location)

        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    const removeLocation = async (id) => {
        await deleteLocation(id)
    }

    return (
        <div className="px-10 h-full overflow-auto relative">

            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}


            <h1 className="text-3xl mb-6 font-bold">Ubicaciones</h1>
            <h4 className="text-2xl mb-6 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 h-auto overflow-scroll ">
                <div className="flex flex-row justify-end mt-2 mb-6">
                    <Button color="primary" variant="contained" onClick={() => edit()} >
                        Agregar Ubicaci??n
                    </Button>
                </div>
                <Table hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Nombre</th>
                           
                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="">Compa??ia</th> : null}
                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="">Creado por</th> : null}
                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="">Fecha de creaci??n</th> : null}
                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="">Actualizado por</th> : null}
                            <th className="">Ultima actualizaci??n</th>
                            <th className="text-center">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >

                        {map(locations, (location, index) => {
                            return (
                                <tr key={location._id} >
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{location.name}</td>
                                    
                                    {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{location.company ? location.company.name : 'N/A'}</td> : null}
                                    {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{location.created_by ? location.created_by.name : 'N/A'}</td> : null}
                                    {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{location.created_date ? `${moment(location.created_date ).format('DD/MM/YY h:mm a')}` : 'N/A'}</td> : null}
                                    {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{location.updated_by ? location.updated_by.name : 'N/A'}</td> : null}
                                    <td className="align-middle">{location.updated_date ? `${moment(location.updated_date ).format('DD/MM/YY h:mm a')}` : 'N/A'}</td>
                                    <td className="align-middle text-center">{location.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                    <td className="align-middle text-right">
                                        {location.status && user.role === 'SUPER_ADMIN' || location.status && user.role === 'ADMIN' ?
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => removeLocation(location._id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Borrar
                                            </Button> : ''}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
            <LocationModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Collections;