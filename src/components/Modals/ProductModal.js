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
import Api from '../../utils/api'
import AuthContext from "../../Context/Auth/authContext";
import ProductContext from '../../Context/Products/productContext';

const ProductModal = (props) => {
    const { onHide, show } = props;
    const authContext = useContext(AuthContext)
    const { user, company } = authContext;
    const productContext = useContext(ProductContext)
    const { item, editProduct, addProduct } = productContext;
    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState('')
    const [locations, setLocations] = useState([])
    const [locationSelected, setLocationSelected] = useState('')
    const [productName, setProductName] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productCnt, setProductCnt] = useState('');
    const [previewImg, setPreviewImg] = useState(null);
    const [uploadImg, setUploadImg] = useState(null);
    const [companies, setCompanies] = useState([])
    const [companiesSelected, setCompaniesSelected] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {

        (async () => {

            if (company) {
                setCompaniesSelected(company.id)
            }
            if (item) {
                setProductName(item.name);
                setProductCode(item.code);
                setProductCnt(item.cnt);
                setPreviewImg({ file: item.image });
                setLocationSelected(item.category);
                setClientSelected(item.client)
                setCompaniesSelected(item.company.id)
            }
            await listClients();
            await listLocations()
            if (user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT') {
                await listCompanies()
            }

            setLoading(false)
        })()
    }, [item])




    const listClients = async () => {
        const itemClients = await Api.getClients();

        const clientOption = map(itemClients.clients, (client, index) => {
            return <option key={index + 1} value={client._id}>{client.name} - {client.company.name}</option>
        })

        setClients(clientOption)
    }



    const listLocations = async () => {
        const itemLocations = await Api.getCategories();
        console.log(itemLocations.categories)
        const locationOption = map(itemLocations.categories, (location, index) => {
            return <option key={index + 1} value={location._id}> {location.name} - {location.company?.name}  </option>
        })
        setLocations(locationOption)
    }

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
    //             if (item) await Api.postProduct(data)
    //             else await Api.updateProduct(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         setLoading(false)
    //     }
    // })

    const handleChange = async (event) => {
        // Prevent default behavior
        event.preventDefault();

        setPreviewImg({
            file: URL.createObjectURL(event.target.files[0])
        })
        setUploadImg(event.target.files[0])


    }

    const handleSubmission = async (uploadImg) => {
        let args = {}
        if (uploadImg) {
            let fd = new FormData();
            fd.append('file', uploadImg, uploadImg.name);

            console.log('FORMDATA:', fd.get('file'))
            const image = await Api.uploadImage(fd)
            if (image.msg === 'done') {
                args.image = image.url
            }
        }
        if (productName !== '' && productCode !== '' && locationSelected !== '' && clientSelected !== '') {

            args.name = productName;
            args.status = true;
            args.code = productCode;
            args.ctn = productCnt;
            args.category = locationSelected;
            args.client = clientSelected;
            args.avaliable = true;
            args.company = companiesSelected;

        }


        console.log('enviando')

        await addProduct(args)
        close()
        // if (product.msg === 'done') {
        //     onHide()
        //     setError(!error);
        //     setErrorMsg('')
        //     resetFields()
        // }

    };

    // const showError = (msg) => {
    //     setError(true);
    //     setErrorMsg(msg)

    //     setTimeout(() => {
    //         setError(false);
    //         setErrorMsg('')
    //     }, 5000);
    // }

    const close = () => {
        editProduct(null)
        onHide()
        resetFields()
    }

    const resetFields = () => {
        setProductCode('')
        setProductName('')
        setProductCnt('')
        setLocationSelected('')
        setLocationSelected('')
        setPreviewImg(null)
        setUploadImg(null)
        setErrorMsg('')
        setError(false);
        setCompaniesSelected('')
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
                    {item ? 'Editar ' + item.name : 'Agregar un producto'}
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>
                {/* {
                    error &&   <Alert variant='danger'>
                                  {  errorMsg }
                                </Alert>
                } */}
                <Form>
                    <div className="grid grid-rows-3 grid-flow-col gap-4">
                        <Form.Group className="mb-3" controlId="producto_name">
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control type="text" placeholder="Producto" value={productName} onChange={e => setProductName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="product_code">
                            <Form.Label>Código del producto</Form.Label>
                            <Form.Control type="text" placeholder="Código del producto" value={productCode} onChange={e => setProductCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="client_id">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select data-live-search aria-label="Cliente" onChange={(event) => setClientSelected(event.target.value)} value={clientSelected}>
                                <option key='0' value=''> Selecciona un cliente</option>
                                {clients}
                            </Form.Select>
                        </Form.Group>
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

                        <Form.Group className="mb-3" controlId="ubicacion">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Select data-live-search aria-label="Ubicaciones" onChange={(event) => setLocationSelected(event.target.value)} value={locationSelected}>
                                <option key='0' value=''> Selecciona una ubicacion</option>
                                {locations}
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cnt">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder="Cantidad" value={productCnt} onChange={(event) => setProductCnt(event.target.value)} value={productCnt} />
                        </Form.Group>


                    </div>
                    <div className="grid grid-rows-1 grid-flow-col gap-4">
                        <Form.Group className="mb-3" controlId="cnt">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" placeholder="image" name="file" onChange={(e) => handleChange(e)} accept="jpg|png|jpeg" />
                        </Form.Group>
                        {previewImg && <img src={previewImg.file} width='100px' height="100px" />}
                    </div>
                </Form>
            </ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSubmission(uploadImg)}>
                        {!item ? 'Guardar' : 'Actualizar'}
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