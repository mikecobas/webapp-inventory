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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Api from '../../utils/api'
import { map } from 'lodash'

import AuthContext from "../../Context/Auth/authContext";
import ClientContext from '../../Context/Client/clientContext';

const ProductModal = (props) => {
    const { onHide, show } = props;
    const authContext = useContext(AuthContext)
    const { user, company } = authContext;
    const clientContext = useContext(ClientContext)
    const { client, deleteClient, addClient, editClient,updateClient } = clientContext;
    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [tel, setTel] = useState('')
    const [cel, setCel] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [rfc, setRfc] = useState('')
    const [companies, setCompanies] = useState([])
    const [companiesSelected, setCompaniesSelected] = useState('')


    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {
            if (company) {
                setCompaniesSelected(company.id)
            }

            if (client) {
                setCompanyName(client.name);
                setContactName(client.name);
                setEmail(client.email);
                setTel(client.phone);
                setCel(client.cel);
                setRfc(client.rfc);
                setAddress(client.address);
            }

            if (user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT') {
                await listCompanies()
            }

            console.log(companiesSelected)
            setLoading(false)
        })()
    }, [client])

    const listCompanies = async () => {
        const itemCompanies = await Api.getCompanies();

        const companyOption = map(itemCompanies.companies, (company, index) => {
            return <option key={index + 1} value={company._id}>{company.name}</option>
        })

        setCompanies(companyOption)
    }



    // const formik = useFormik({
    //     initialValues: initialValues(),
    //     validationSchema: Yup.object(validationSchema()),
    //     onSubmit: async (data) => {
    //         setLoading(true)
    //         try {
    //             if (item) await Api2.postProduct(data)
    //             else await Api2.updateProduct(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         setLoading(false)
    //     }
    // })

    const handleChange = async (event) => {



    }

    const handleSubmission = async () => {
        console.log('preparando')
        if (companyName.trim() !== '' && email.trim() !== '' && tel.trim() !== '' && cel.trim() !== '' && address.trim() !== '' && rfc.trim() !== '' && contactName.trim() !== '') {
            
            const args = {
                name: companyName,
                contact_name: contactName,
                email,
                phone: tel,
                cel,
                rfc,
                address,
                company : companiesSelected

            }

            console.log(args)
            if (client) {
                await updateClient(client._id,args)
            } else {
                console.log('enviando')
                 await addClient(args)
          }
            
         
                close()
  
        }
    };



    const resetFields = () => {
        setCompanyName('');
        setContactName('');
        setEmail('');
        setTel('');
        setCel('');
        setRfc('');
        setAddress('');
        setCompaniesSelected('');
    }

    const close = () => {

        onHide()
        resetFields()
    }

    return (
        <Modal

            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader closeButton>

                <ModalTitle id="contained-modal-title-vcenter">
                    {client ? 'Editar ' + client.name : 'Agregar Cliente'}
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>

                <Form>
                    <div className="grid grid-rows-3 grid-flow-col gap-4">
                        <Form.Group className="mb-3" controlId="client_name">
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <Form.Control type="text" placeholder="Nombre de la empresa" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="client_name">
                            <Form.Label>Nombre del Representante</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tel">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" placeholder="Teléfono" value={tel} onChange={(e) => setTel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rfc">
                            <Form.Label>RFC</Form.Label>
                            <Form.Control type="text" placeholder="RFC" value={rfc} onChange={(e) => setRfc(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cel">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control type="text" placeholder="Celular" value={cel} onChange={(e) => setCel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" placeholder="direccion" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo de contacto</Form.Label>
                            <Form.Control type="text" placeholder="Correo de contacto" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>


                    </div>
                    {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ?
                        <Form.Group className="mb-3" controlId="client_id">
                            <Form.Label>Compañia</Form.Label>
                            <Form.Select data-live-search aria-label="Compañia" onChange={(event) => setCompaniesSelected(event.target.value)} value={companiesSelected}>
                                <option key='0' value=''> Selecciona una compañia</option>
                                {companies}
                            </Form.Select>
                        </Form.Group>
                        :
                        null
                    }

                </Form>
            </ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSubmission()}>
                        {!client ? 'Guardar' : 'Actualizar'}
                    </Button>
                </ModalFooter> </>}
            {loading && <>
                <CircularProgress />
            </>}
        </Modal>
    )
}

// function initialValues() {
//     return {
//         name: '',
//         cnt: '',
//         code: '',
//         category: '',
//         client: '',
//         image: '',

//     }
// }

// function validationSchema() {
//     return {
//         name: Yup.string().required(true),
//         cnt: Yup.number().required(true),
//         code: Yup.string().required(true),
//         category: Yup.string().required(true),
//         client: Yup.string().required(true),
//         image: Yup.string(),
//     }
// }

export default ProductModal