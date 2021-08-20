/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/Users.css'
import {map} from 'lodash'
import Api2 from '../utils/api'

const Products = () => {
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState();

    useEffect(() => {
        (async () => {
            const items = await Api2.getProducts();
            
            setProducts(items.products)
            console.log(items.products)
            setTotal(items.total)
            
         
        })()
    }, [])


    return (
        <div  className="p-20 h-screen">
            <h1 className="text-3xl mb-6 font-bold">Productos</h1>
            <h4 className="text-2xl mb-6 font-normal">Total { total }</h4>
            <div className="rounded-3xl shadow p-4 h-auto overflow-scroll ">
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

    {map(products, (product,index) => {
        return (
            <tr key={product._id} >
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle"><img src={product.image} alt={product.name} /></td>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle text-center">{product.cnt}</td>
                <td className="align-middle">{product.code}</td>
                <td className="align-middle">{product.category.name}</td>
                <td className="align-middle">{product.client.company_name}</td>
                <td className="align-middle text-center">{ product.available ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                <td className="align-middle text-right">
                <IconButton aria-label="editar" color="primary">
                    <EditIcon />
                </IconButton>
                    {product.available ?
                        <IconButton aria-label="delete" color="secondary">
                            <DeleteIcon />
                        </IconButton> : ''}
                </td>
            </tr>
          )
      })}
    
  </tbody>
</Table>
           </div>
            </div>
    )
}
export default Products;