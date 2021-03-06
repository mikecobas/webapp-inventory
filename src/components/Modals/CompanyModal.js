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
import { map } from 'lodash'

import CompanyContext from '../../Context/Companies/companyContext';

const ProductModal = (props) => {
    const { onHide, show } = props;
    const companyContext = useContext(CompanyContext)
    const {company, message, addCompany, updateCompany} = companyContext;
    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [tel, setTel] = useState('')
    const [cel, setCel] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [rfc, setRfc] = useState('')
    const [billing_date, setBillingDate] = useState('')


    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {

            if (company) {
                setCompanyName(company.name);
                setContactName(company.contact_name);
                setEmail(company.email);
                setTel(company.phone);
                setCel(company.cel);
                setRfc(company.rfc);
                setAddress(company.address);
            }

            setLoading(false)
        })()
    }, [company])





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

        if (companyName.trim() !== '' && email.trim() !== '' && tel.trim() !== '' && cel.trim() !== '' && address.trim() !== '' && rfc.trim() !== '' && contactName.trim() !== '') {
            const args = {
                name: companyName,
                contact_name: contactName,
                email,
                phone: tel,
                cel,
                rfc,
                address,
                billing_date,
            }
            if (company) {
              await updateCompany(company._id,args)
          } else{
                 await addCompany(args)
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
                    {company ? 'Editar ' + company.name : 'Agregar nueva compa????a'}
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>

                <Form>
                    <div className="grid grid-rows-3 grid-flow-col gap-4">
                        <Form.Group className="mb-3" controlId="company_name">
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <Form.Control type="text" placeholder="Nombre de la empresa" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="client_name">
                            <Form.Label>Nombre del contacto</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tel">
                            <Form.Label>Tel??fono</Form.Label>
                            <Form.Control type="text" placeholder="Tel??fono" value={tel} onChange={(e) => setTel(e.target.value)} />
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
                            <Form.Label>Direcci??n</Form.Label>
                            <Form.Control type="text" placeholder="direccion" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo de contacto</Form.Label>
                            <Form.Control type="text" placeholder="Correo de contacto" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>


                    </div>

                </Form>
            </ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSubmission()}>
                        {!company ? 'Guardar' : 'Actualizar'}
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