/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
import moment from 'moment'
/**
 * Material UI
 */
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core//Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@mui/icons-material/Search';

/** 
 * Boostrap
 */
import Table from 'react-bootstrap/Table'
import Overlay from 'react-bootstrap/Overlay'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
/**
 * COMPONENTES
 */
import ProductModal from '../components/Modals/ProductModal'
/**
 * CONTEXTS
 */
import AuthContext from '../Context/Auth/authContext'
import ProductContext from '../Context/Products/productContext';
import AlertContext from '../Context/Alerta/alertContext';


const Products = () => {


    const authContext = useContext(AuthContext)
    const { user } = authContext;

    const productContext = useContext(ProductContext)
    const { products,
        message,
        total,
        loading,
        getProductsList,
        deleteProduct,
        editProduct,
        searchProducts,
        restoreProduct
    } = productContext;
    const alertContext = useContext(AlertContext);
    const { alerta,
        mostrarAlerta } = alertContext;
    const [searchTerm, setSearchTerm] = useState('')
    const [modalShow, setModalShow] = useState(false);



    useEffect(() => {

        (async () => {
            // const userInfo = await JSON.parse(localStorage.getItem('user'));
            if (searchTerm !== '') {
                await searchProducts(searchTerm)
            } else {
                await getProductsList()
            }
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }
            // setUser(userInfo)
            console.log(products)
        })()
    }, [loading, message])

    const edit = (product) => {
        editProduct(product)
        setModalShow(true)
    }
    const closeModal = () => {
        setModalShow(false)
    }
    const removeProduct = async (id) => {
        await deleteProduct(id)
    }

    const recoverProduct = async (id) => {
        await restoreProduct(id)
    }

    const search = async () => {
        if (searchTerm !== '') {
            await searchProducts(searchTerm)
        } else {
            await getProductsList()
        }
    }


    return (
        <div className="px-10 h-full overflow-auto">
            {alerta ? <div className="fixed right-8 top-0 w-auto z-10">
                <Alert variant={alerta.categoria} className="mx-auto my-4">

                    {alerta.msg}
                </Alert>
            </div>
                : null}
            <h1 className="text-3xl my-6 font-bold">Productos  </h1>
            <h4 className="text-2xl mb-3 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4  my-2 max-h-full  overflow-scroll">
                <div className="flex flex-row justify-between mt-2 mb-6">
                    <div>
                        <Form className="flex flex-row">
                            <Form.Group className="mx-2" controlId="name">
                                <Form.Control type="text" placeholder="Buscar productos" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </Form.Group>
                            <Tooltip title="Buscar" placement="bottom">
                                <Button color="primary" variant="outlined" onClick={() => search()}>
                                    <span className="block md:hidden">  <SearchIcon /></span>
                                    <span className="hidden md:block"> Buscar</span>
                                </Button>
                            </Tooltip>
                        </Form>
                    </div>
                    {user.role !== 'USER' && user.role !== 'CLIENT' ?
                   
                        <Tooltip title="Agregar nuevo producto" placement="bottom">
                        <Button color="primary" variant="contained" onClick={() => edit()} >
                            <span className="block md:hidden">
                                <AddIcon />
                            </span>
                            <span className="hidden md:block">Agregar producto</span>
                        </Button>
                    </Tooltip>
                        : null}
                </div>
                {loading && <div className=" text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
                {!loading && products &&
                    <Table hover responsive className="overflow-scroll">
                        <thead>
                            <tr>
                                <th>#</th>

                                {/* <th>Imagen</th> */}
                                <th>Nombre</th>
                                <th className="text-center">Cantidad</th>
                                <th>Código</th>
                                <th>Ubicación</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Compañía</th> : null}
                            {user.role !== 'CLIENT' ? <th>Cliente</th> : null}
                                <th>Fecha de creación</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Creado por</th> : null}
                                <th>Fecha de actualización</th>
                                {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th>Actualizado por</th> : null}

                                <th className="text-center">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            {map(products, (product, index) => {
                                return (
                                    <tr key={product._id} >
                                        <td className="align-middle">{index + 1}</td>
                                        {/* <td className="align-middle">{product.image ? <img src={product.image} alt={product.name ? product.name : ''} width='20px' height="auto" /> : null}</td> */}
                                        <td className="align-middle">{product.name ? product.name : ''}</td>
                                        <td className="align-middle text-center">{product.cnt}</td>
                                        <td className="align-middle">{product.code}</td>
                                        <td className="align-middle">{product.location.name}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{product.company.name}</td> : null}
                                        {user.role !== 'CLIENT' ? <td className="align-middle">{product.client.name}</td> : null}
                                        <td className="align-middle">{product.created_date ? `${moment(product.created_date).format('DD/MM/YY h:mm a')}` : 'N/A'}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{product.created_by.name}</td> : null}
                                        <td className="align-middle">{product.updated_date ? `${moment(product.updated_date).format('DD/MM/YY h:mm a')}` : 'N/A'}</td>
                                        {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{product.updated_by.name}</td> : null}
                                        <td className="align-middle text-center">{product.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                        <td className="align-middle text-right">
                                            {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' || user.role === 'ADMIN' ?
                                                <IconButton aria-label="editar" color="primary" onClick={() => edit(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                : ''}
                                            {product.status && user.role !== 'CLIENT' && user.role !== 'USER' ? 
                                                <Tooltip title="Borrar producto" placement="bottom">
                                                    <IconButton aria-label="editar" color="secondary" onClick={() => removeProduct(product._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                : null}
                                            {!product.status && user.role === 'SUPER_ADMIN' || !product.status && user.role === 'SUPER_ADMIN' ?
                                                <Tooltip title="Recuperar producto" placement="bottom">
                                                    <IconButton aria-label="editar" color="primary" onClick={() => recoverProduct(product._id)}>
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
                {!loading && products.length === 0 && <div className="text-center py-5">
                    <h5>No cuentas con productos dados de alta</h5>

                </div>}

            </div>
            <ProductModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Products;