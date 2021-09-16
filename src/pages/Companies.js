/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
import moment from 'moment'
/**
 * MATERIAL UI
 */
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
/**
 * BOOTSTRAP
 */
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'

/**
 * COMPONENTES
 */
import CompanyModal from '../components/Modals/CompanyModal'
/**
 * CONTEXT
 */

import AuthContext from '../Context/Auth/authContext'
import CompanyContext from '../Context/Companies/companyContext';
import AlertContext from '../Context/Alerta/alertContext';

const Companies = (props) => {
    const authContext = useContext(AuthContext)
    const { user } = authContext;
    const companyContext = useContext(CompanyContext)
    const {
        companies,
        total,
        loading,
        message,
        getCompanies,
        deleteCompany,
        editCompany,
        activatedCompany,
        searchCompany,
    } = companyContext;

    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;
    const [searchTerm, setSearchTerm] = useState('')
    const [modalShow, setModalShow] = useState(false);

    // companies.filter((companies) => companies.status === true) para filtartlos y hacer tabs

    useEffect(() => {
        (async () => {

            if (searchTerm !== '') {
                await searchCompany(searchTerm)
            } else {
                await getCompanies()
            }
            
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }
        })()
    }, [loading, message])

    const edit = (company) => {
        editCompany(company)
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    const removeCompany = async (id) => {
        await deleteCompany(id)
    }
    const activeCompany = async (id) => {
        await activatedCompany(id)
    }

    const search = async () => {
        if (searchTerm !== '') {
            await searchCompany(searchTerm)
        } else {
            await getCompanies()
        }
    }

    return (
        <div className="p-20 h-full relative">

            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}


            <h1 className="text-3xl mb-6 font-bold">Compañias</h1>
            <h4 className="text-2xl mb-6 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 overflow-scroll ">
                
            <div className="flex flex-col-reverse md:flex-row justify-between mt-2 mb-6">
                    <div className="my-2 md:my-0">
                        <Form className="flex flex-row">
                            <Form.Group className="mx-2" controlId="name">
                                <Form.Control type="text" placeholder="Buscar compañias" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </Form.Group>
                            <Button color="primary" variant="outlined" onClick={() => search()}>
                                Buscar
                            </Button>
                        </Form>
                    </div>
                    <Button color="primary" variant="contained" onClick={() => edit()} >
                       <span > Agregar Compañía</span>
                    </Button>
                </div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Compañia</th>

                            <th className="">Nombre del Cliente</th>
                            {/* <th className="">Dirección</th> */}
                            <th className="">Datos de contacto</th>
                            {/* <th className="">Teléfono</th>
                            <th className="">Celular</th>
                            <th className="">Correo</th> */}
                            <th className="text-center">Fecha de creación</th>
                            {/* <th className="">Creado por</th> */}
                            <th className="text-center">Ultima actualización</th>
                            {/* <th className="">Actualizado por</th> */}
                            <th className="text-center">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >

                        {map(companies, (company, index) => {
                            return (
                                <tr key={company._id} >
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{company.name}</td>

                                    <td className="align-middle">{company.contact_name ? company.contact_name : 'N/A'}</td>
                                    {/* <td className="align-middle">{company.address ? company.address : 'N/A'}</td> */}
                                    <td className="flex flex-col justify-center">
                                        <span className="my-2"><PhoneIcon fontSize="small" /> {company.phone ? company.phone : 'N/A'}</span>
                                        <span className="my-2"><PhoneIphoneIcon fontSize="small" /> {company.cel ? company.cel : 'N/A'}</span>
                                        <span className="my-2"><MailOutlineIcon fontSize="small" />  {company.email ? company.email : 'N/A'}</span>
                                    </td>
                                    {/* <td className="align-middle">{company.phone ? company.phone : 'N/A'}</td>
                                    <td className="align-middle">{company.cel ? company.cel : 'N/A'}</td>
                                    <td className="align-middle">{company.email ? company.email : 'N/A'}</td> */}
                                    <td className="align-middle text-center">{company.created_date ? `${moment(company.created_date).format('DD/MM/YY')}` : 'N/A'}</td>
                                    {/* <td className="align-middle">{company.created_by ? company.created_by.name : 'N/A'}</td> */}
                                    <td className="align-middle text-center">{company.updated_date ? `${moment(company.updated_date).format('DD/MM/YY h:mm a')}` : 'N/A'}</td>
                                    {/* <td className="align-middle">{company.updated_by ? company.updated_by.name : 'N/A'}</td> */}
                                    <td className="align-middle text-center">{company.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                    <td className="align-middle text-right">
                                        <td className="align-middle text-right">
                                            {user.role === 'SUPER_ADMIN' && company.status ?
                                                <Tooltip title="Editar compañía" placement="bottom">
                                                    <IconButton aria-label="editar" color="primary" onClick={() => edit(company)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>

                                                : ''}
                                            {company.status ?
                                                <Tooltip title="Borrar compañía" placement="bottom">
                                                    <IconButton aria-label="editar" color="secondary" onClick={() => removeCompany(company._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                : <Tooltip title="Reactivar compañía" placement="bottom">
                                                    <IconButton aria-label="editar" color="primary" onClick={() => activeCompany(company._id)}>
                                                        <RestoreFromTrashIcon />
                                                    </IconButton>
                                                </Tooltip>}
                                        </td>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
            <CompanyModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Companies;