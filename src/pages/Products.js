/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core//Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectSearch from 'react-select-search';
import '../css/Users.css'
import { map } from 'lodash'
import ProductModal from '../components/Modals/ProductModal'



import AuthContext from '../Context/Auth/authContext'
import ProductContext from '../Context/Products/productContext';

const Products = () => {
    const authContext = useContext(AuthContext)
  const {user } = authContext;
    
    const productContext = useContext(ProductContext)
    const { products, total, loading, getProducts, deleteProduct, editProduct } = productContext;
    const [modalShow, setModalShow] = useState(false);
    


    useEffect(() => {
        (async () => {
            // const userInfo = await JSON.parse(localStorage.getItem('user'));
             await getProducts()
            // setUser(userInfo)



        })()
    }, [products, loading])

    const edit = (product) => {
        console.log(product)
        editProduct(product)
        setModalShow(true)
    }
    const closeModal = () => {
        ;
        setModalShow(false)
    }
    const removeProduct = async (id) => {
        await deleteProduct(id)
    }


    return (
        <div className="px-20 h-full">
            <h1 className="text-3xl my-6 font-bold">Productos </h1>
            <h4 className="text-2xl mb-3 font-normal">Total {total}</h4>
            <div className="rounded-3xl shadow p-4 h-auto overflow-scroll my-2">
                <div className="flex flex-row justify-end mt-2 mb-6">
                    <Button color="primary" variant="contained" onClick={() => edit()}>
                        Agregar nuevo producto
                    </Button>
                </div>
                <Table hover responsive size="sm">
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
                                    <td className="align-middle">{product.client.company_name}</td>
                                    <td className="align-middle text-center">{product.available ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                                    <td className="align-middle text-right">
                                        {/* <IconButton aria-label="editar" color="primary" onClick={() => edit(product)}>
                                            <EditIcon />
                                        </IconButton> */}
                                        {product.available && user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ?
                                            <IconButton aria-label="delete" color="secondary" onClick={() => removeProduct(product._id)}>
                                                <DeleteIcon />
                                            </IconButton> : ''}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
            <ProductModal show={modalShow} onHide={() => closeModal()} />
        </div>
    )
}
export default Products;