/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
/**
 * Material UI
 */
 import { green } from '@material-ui/core/colors';
 import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
 import Button from '@material-ui/core//Button';
 import IconButton from '@material-ui/core/IconButton';
 import EditIcon from '@material-ui/icons/Edit';
 import DeleteIcon from '@material-ui/icons/Delete';
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
    const { products, message, total, loading, getProducts, deleteProduct, editProduct, searchProducts } = productContext;
    const alertContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertContext;
    const [searchTerm, setSearchTerm] = useState('')
    const [modalShow, setModalShow] = useState(false);



    useEffect(() => {

        (async () => {
            // const userInfo = await JSON.parse(localStorage.getItem('user'));
            if (searchTerm !== '') {
                await searchProducts(searchTerm)
            } else {
                await getProducts()
            }
            if (message) {
                mostrarAlerta(message.msg, message.categoria)
            }
            // setUser(userInfo)
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

    const search = async () => {
        if (searchTerm !== '') {
            await searchProducts(searchTerm)
        } else {
            await getProducts()
        }
    }


    return (
        <div className="px-20 h-full relative">
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
                            <Button color="primary" variant="outlined" onClick={() => search()}>
                                Buscar
                            </Button>
                        </Form>
                    </div>
                    <Button color="primary" variant="contained" onClick={() => edit()}>
                        Agregar nuevo producto
                    </Button>
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

                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th className="text-center">Cantidad</th>
                                <th>Código</th>
                                <th>Categoría</th>
                                <th>Compañia</th>
                                <th className="text-center">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >

                            {map(products, (product, index) => {
                                return (
                                    <tr key={product._id} >
                                        <td className="align-middle">{index + 1}</td>
                                        <td className="align-middle">{product.image ? <img src={product.image} alt={product.name ? product.name : ''} width='20px' height="auto" /> : null}</td>
                                        <td className="align-middle">{product.name ? product.name : ''}</td>
                                        <td className="align-middle text-center">{product.cnt}</td>
                                        <td className="align-middle">{product.code}</td>
                                        <td className="align-middle">{product.category.name}</td>
                                        <td className="align-middle">{product.client.name}</td>
                                        <td className="align-middle text-center">{product.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                        <td className="align-middle text-right">

                                            {/* <IconButton aria-label="editar" color="primary" onClick={() => edit(product)}>
                                            <EditIcon />
                                        </IconButton> */}
                                            {product.status && user.role === 'ADMIN' || product.status && user.role === 'SUPER_ADMIN' ?
                                                <IconButton aria-label="delete" color="secondary" onClick={() => removeProduct(product._id)}>
                                                    <DeleteIcon />
                                                </IconButton> : ''}
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