/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/Users.css'
import {map} from 'lodash'
import Api2 from '../utils/api'

const Collections = (props) => {
  
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState();

    useEffect(() => {
        (async () => {
            const listCategories = await Api2.getCategories();
            console.log(listCategories)
            setCategories(listCategories.categories)
            setTotal(listCategories.total)
            
         
        })()
    }, [])


    return (
        <div  className="p-20 h-screen">
            <h1 className="text-3xl mb-6 font-bold">Categorias</h1>
            <h4 className="text-2xl mb-6 font-normal">Total { total }</h4>
            <div className="rounded-3xl shadow p-4 h-auto overflow-scroll ">
            <Table hover responsive size="sm"> 
  <thead>
    <tr>
      <th>#</th>
      
                            <th>Nombre</th>
                            <th className="text-center">Status</th>
                            <th></th>
    </tr>
  </thead>
  <tbody >

    {map(categories, (category,index) => {
        return (
            <tr key={category._id} >
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">{category.name}</td>
                <td className="align-middle text-center">{ category.status ? <FiberManualRecordIcon style={{ color: green[500] }} /> : <FiberManualRecordIcon color="secondary" />}</td>
                <td className="align-middle text-right">
                    {category.status ?
                        <Button
                            variant="contained"
                            color="secondary"
                            size="sm"
                            startIcon={<DeleteIcon />}
                        >
                            Borrar
                        </Button>  : ''}
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
export default Collections;