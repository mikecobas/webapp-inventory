/* eslint-disable no-mixed-operators */
import React, { useState, useEffect, useContext } from 'react'
/**
 * MATERIAL UI
 */

import { green, red, blue, indigo, purple, yellow } from '@material-ui/core/colors';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import FeaturedPlayListRoundedIcon from '@material-ui/icons/FeaturedPlayListRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HomeWork from '@material-ui/icons/HomeWork'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import ContactsTwoToneIcon from '@material-ui/icons/ContactsTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import LocationCityTwoToneIcon from '@material-ui/icons/LocationCityTwoTone';
import ImportExportTwoToneIcon from '@material-ui/icons/ImportExportTwoTone';

import IconButton from '@material-ui/core/IconButton';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'


import Chart from "react-google-charts";
import moment from 'moment'
import Api from '../utils/api'
import { map } from 'lodash'

import AuthContext from '../Context/Auth/authContext'

const Dashboard = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext;
  const [totals, setTotals] = useState([])
  const [newFrom, setFrom] = useState(moment().startOf('month').format('DD/MM/YYYY'));
  const [newTo, setTo] = useState(moment().format('YYYY-MM-DD'));
  const [dataPie, setDataPie] = useState([["Transactions", "Tipo de transacción"]])
  const [dataProductsByClients, setDataProductsByClients] = useState(
    [
      ["Cliente", "Productos", { role: "style" }]
    ])
  const [topProductInventory, setTopProductInventory] = useState(null)
  const [transactionList, setTransactionList] = useState(null)
  const [loading, setLoading] = useState(true)

  const data = [
    ["Transactions", "Tipo de transacción"]
    ["Entrada", 0],
    ["Salida", 0],
  ];

  const dataCompany = [
    ["Cliente", "Productos", { role: "style" }],
    ["Compañia 1", 0, 'color:red'],
    ["Compañia 2", 0, 'color:red']
  ];
  const options = {

    pieHole: 0,
    is3D: false,
    slices: [
      {
        color: green[500]
      },
      {
        color: red[500]
      }
    ],
  };



  useEffect(() => {
    (async () => {
      const res = await Api.getDasboard()
      const resTransaction = await Api.getDashboardTransactions()
      const resTotalProducts = await Api.getDashboardProductsByClients()
      setDataPie([...dataPie, resTransaction.dataPie.enter, resTransaction.dataPie.exit])
      setDataProductsByClients(resTotalProducts.clients)
      setTopProductInventory(resTotalProducts.productsByClients)

      console.log(dataProductsByClients)
      setTransactionList(resTransaction.transactionList)
      setTotals(res.totals)
      setLoading(false)
    })()
  }, [])


  return (
    <div className="px-10 h-full overflow-auto">
      <div className="flex flex-col lg:flex-row justify-between  items-stretch  print:items-start mb-1">
        <div className="mt-3">
          <h1 className="text-3xl font-bold">Dashboard </h1>
          <h3 className="font-normal text-lg">Hola, {user.name}</h3>
        </div>
      </div>
      <div className={user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? "w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}>
        {totals?.users ? <div className="py-4 bg-green-100 col-auto mx-1 my-2 rounded-3xl	flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-green-200">
            <PeopleAltTwoToneIcon style={{ color: green[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-green-800">{totals?.users}</h3>
            <h3 className="text-base font-normal mt-0 text-green-700">Usuarios</h3>
          </div>

        </div> : null}
        {totals?.clients ? <div className="py-4 bg-blue-100 col-auto mx-1 my-2 rounded-3xl		flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-blue-200">
            <ContactsTwoToneIcon style={{ color: blue[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-blue-800">{totals?.clients}</h3>
            <h3 className="text-base font-normal mt-0 text-blue-700">Clientes</h3>
          </div>

        </div> : null}
        {totals?.products ? <div className="py-4 bg-red-100 col-auto mx-1 my-2 rounded-3xl		flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-red-200">
            <LocalOfferTwoToneIcon style={{ color: red[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-red-800">{totals?.products}</h3>
            <h3 className="text-base font-normal mt-0 text-red-700">Productos Activos</h3>
          </div>

        </div>
          : null}
        {totals?.locations ? <div className="py-4 bg-yellow-100 col-auto mx-1 my-2 rounded-3xl		flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-yellow-200">
            <LocationCityTwoToneIcon style={{ color: yellow[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-yellow-800">{totals?.locations}</h3>
            <h3 className="text-base font-normal mt-0 text-yellow-700">Ubicaciones</h3>
          </div>

        </div>
          : null}
        {user.role === 'SUPER_ADMIN' && totals?.companies || user.role === 'SUPPORT' && totals?.companies ? <div className="py-4 bg-indigo-100 col-auto mx-1 my-2 rounded-3xl		flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-indigo-200">
            <BusinessTwoToneIcon style={{ color: indigo[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-indigo-800">{totals?.companies}</h3>
            <h3 className="text-base font-normal mt-0 text-indigo-700">Compañias activas</h3>
          </div>

        </div>
          : null}
        {totals?.transactions ? <div className="py-4 bg-purple-100 col-auto mx-1 my-2 rounded-3xl flex items-center flex-col">
          <div className=" rounded-full  w-20 h-20 justify-center items-center middle flex  bg-purple-200">
            <ImportExportTwoToneIcon style={{ color: purple[800], fontSize: 48 }} />
          </div>
          <div className="text-center">
            <h3 className="text-4xl pt-3 mb-0 text-purple-800">{totals?.transactions}</h3>
            <h3 className="text-base font-normal mt-0 text-purple-700">Entradas / Salidas</h3>
          </div>

        </div>
          : null}

      </div>
      {/* <div>
        <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
          <Form.Label>Fecha de inicio</Form.Label>
          <Form.Control type="date" name='inicio' value={newFrom} onChange={(e) => setFrom(e.target.value)} />
        </Form.Group>

        <Form.Group className="mx-2 my-2 sm:my-0" controlId="startDate">
          <Form.Label>Fecha de final</Form.Label>
          <Form.Control type="date" name='fin' value={newTo} onChange={(e) => setTo(e.target.value)} />
        </Form.Group>
      </div> */}
      <div className="divide-solid h-10"></div>
      <div className="flex flex-col md:flex-row my-4">
        <div className="rounded-3xl shadow p-4  mr-0 md:mr-3 w-12/12 md:w-8/12">
          <div className="py-2">
            <h1 className="text-lg font-bold">Ultimos movimientos </h1>
          </div>
          <div className="text-sm h-64 overflow-auto" >
            <Table hover responsive className="text-sm">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th className="uppercase text-center">Status</th>
                  <th className="uppercase">Producto</th>
                  <th className="uppercase text-center">Cantidad</th>
                  <th className="uppercase text-center" >Fecha</th>
                  <th className="uppercase text-center">Código</th>
                  {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="uppercase">Compañía</th> : null}
                  <th className="uppercase">Cliente</th>


                </tr>
              </thead>
              <tbody >

                {map(transactionList, (transaction, index) => {
                  return (
                    <tr key={transaction._id} >
                      {/* <td className="align-middle">{index + 1}</td> */}
                      <td className="align-middle text-center">{transaction.status ? <ArrowUpwardIcon style={{ color: green[500] }} /> : <ArrowDownwardIcon color="error" />}</td>
                      <td className="align-middle">{transaction.product_name}</td>
                      <td className="align-middle text-center">{transaction.status ? <span style={{ color: green[500] }}>+ ${transaction.cnt}</span> : <span style={{ color: red[500] }}>- ${transaction.cnt}</span>}</td>
                      <td className="align-middle text-center">{transaction.timestamp && moment(transaction.timestamp).format('DD/MM/YYYY HH:mm a')}</td>
                      <td className="align-middle text-center">{transaction.code}</td>
                      {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{transaction.company.name}</td> : null}
                      <td className="align-middle">{transaction.client.name}</td>


                    </tr>
                  )
                })}

              </tbody>
            </Table>
          </div>

        </div>
        <div className="rounded-3xl shadow  right-0 w-12/12 md:w-4/12 p-2">
          {!loading ?
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={!loading ? dataPie : data}
              options={options}
            /> : null}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-4">

        <div className="rounded-3xl shadow p-4  mr-0 lg:mr-3 w-12/12 lg:w-6/12 right-0">
          <div className="py-2">
            <h1 className="text-lg font-bold">Total de productos por cliente</h1>
          </div>
          <Chart chartType="ColumnChart" width="100%" height="400px" data={!loading ? dataProductsByClients : dataCompany} />
        </div>
        <div className="rounded-3xl shadow p-4  mr-0 lg:mr-3 w-12/12 lg:w-6/12">
          <div className="py-2">
            <h1 className="text-lg font-bold">Productos con más stock</h1>
          </div>
          <div className="text-sm h-64 overflow-auto" >
            <Table hover responsive className="text-sm">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <th className="uppercase">Compañía</th> : null}
                  <th className="uppercase">Cliente</th>
                  <th className="uppercase">Producto</th>
                  <th className="uppercase text-center">Cantidad</th>
                  <th className="uppercase text-center">Código</th>
               


                </tr>
              </thead>
              <tbody >

                {map(topProductInventory, (product, index) => {
                  return (
                    <tr key={product._id} >
                      {/* <td className="align-middle">{index + 1}</td> */}
                      {user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT' ? <td className="align-middle">{product.company.name}</td> : null}
                      <td className="align-middle">{product.client.name}</td>
                      <td className="align-middle">{product.name}</td>
                      <td className="align-middle text-center">{product.cnt}</td>
                      <td className="align-middle text-center">{product.code}</td>
                    </tr>
                  )
                })}

              </tbody>
            </Table>
          </div>

        </div>
      </div>
    </div>
  )
}




export default Dashboard;