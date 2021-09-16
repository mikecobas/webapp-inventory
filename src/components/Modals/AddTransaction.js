/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Form from 'react-bootstrap/Form'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from 'react-bootstrap/Alert'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Api from '../../utils/api'
import { map } from 'lodash'

import AuthContext from "../../Context/Auth/authContext";


const AddTransaction = (props) => {
    const { onHide, show } = props;
    const authContext = useContext(AuthContext)
    const { user, company } = authContext;
    const [loading, setLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [clientsSelected, setClientsSelected] = useState('')
    const [companies, setCompanies] = useState([])
    const [companiesSelected, setCompaniesSelected] = useState('')
    const [code, setCode] = useState('')
    const [cnt, setCnt] = useState('')
    const [status, setStatus] = useState('');




    const listClients = async () => {
        const itemClients = await Api.getClients();

        const clientsOption = map(itemClients.clients, (client, index) => {
            return <option key={index + 1} value={client._id}>{client.name}</option>
        })

        setClients(clientsOption)
    }

    const listCompanies = async () => {
        const itemCompanies = await Api.getCompanies();

        const companyOption = map(itemCompanies.companies, (company, index) => {
            return <option key={index + 1} value={company._id}>{company.name}</option>
        })



        setCompanies(companyOption)


    }

    useEffect(() => {

        (() => {
            if (company) {
                setCompaniesSelected(company.id)
                listClients()
            } else {
                listCompanies()

            }
            setLoading(false)
        })()

    }, [companiesSelected])

    const setCompanyAndCallClients = (data) => {
        setCompaniesSelected(data.target.value)
        listClients()

    }
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handleSubmission = async () => {
        const args = {
            cnt,
            status: status === 'Entrada' ? true : false,
            code,
            client: clientsSelected
        }

        const res = await Api.postTransactions(args)
        if (res.msg === 'done') {
            close()
        }
        console.log(res.msg)


    };



    const resetFields = () => {
        setCompaniesSelected('');
        setCode('');
        setCnt(0)
        setStatus('');
    }

    const close = () => {

        onHide()
        resetFields()
    }
    return (
        <Modal

            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader closeButton>

                <ModalTitle id="contained-modal-title-vcenter">
                    Agregar transacción {company ? company._id : 'no'}
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>

                <Form>
                    <div className="grid grid-rows-3 grid-flow-col gap-4">






                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?
                            <Form.Group className="mb-3" controlId="client_id">
                                <Form.Label>Compañia</Form.Label>
                                <Form.Select data-live-search aria-label="Compañia" onChange={(event) => setCompanyAndCallClients(event)} value={companiesSelected}>
                                    <option key='0' value=''> Selecciona una compañia</option>
                                    {companies}
                                </Form.Select>
                            </Form.Group>
                            :
                            null
                        }
                        {companiesSelected ?
                            <Form.Group className="mb-3" controlId="client_id">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Select data-live-search aria-label="Cliente" onChange={(event) => setClientsSelected(event.target.value)} value={clientsSelected}>
                                    <option key='0' value=''> Selecciona el cliente</option>
                                    {clients}
                                </Form.Select>
                            </Form.Group>
                            :
                            null
                        }

                        <Form.Group className="mb-3" controlId="cnt">
                            <Form.Label>Código</Form.Label>
                            <Form.Control type="text" placeholder="código" value={code} onChange={(e) => setCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cnt">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder="Cantidad" value={cnt} onChange={(e) => setCnt(e.target.value)} />
                        </Form.Group>


                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de transacción</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={status} onChange={handleChange}>
                                <FormControlLabel value="Entrada" control={<Radio />} label="Entrada" />
                                <FormControlLabel value="Salida" control={<Radio />} label="Salida" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Form>
            </ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSubmission()}>
                        Agregar
                    </Button>
                </ModalFooter> </>}
            {loading && <>
                <CircularProgress />
            </>}
        </Modal>
    )
}

export default AddTransaction;