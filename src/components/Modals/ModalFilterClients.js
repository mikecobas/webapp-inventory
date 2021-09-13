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

import InputGroup from 'react-bootstrap/InputGroup'
import Api from '../../utils/api'
import { map } from 'lodash'

import AuthContext from "../../Context/Auth/authContext";
import ClientContext from '../../Context/Client/clientContext';

const FilterClientsModal = (props) => {
    const { onHide, show } = props;
    const authContext = useContext(AuthContext)
    const { user, company } = authContext;
    const clientContext = useContext(ClientContext)
    const { getClients } = clientContext;
    const [clientes, setClientes] = useState([])
    const [filterClients, setFilterClients] = useState([])
    const [filterList, setFilterList] = useState([])
    const [arrayHolder, setArrayHolder] = useState([])



    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {


            if (user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT') {
                await listClients()
            }

            setLoading(false)
        })()
    }, [])

    const listClients = async () => {
        const clientList = []
        const itemClients = await Api.getClients();
        setArrayHolder(itemClients.clients)
 
        for (let i = 0; i < itemClients.clients.length; i++) {
            const client = <Form.Check
                type='checkbox'
              //  checked={arrayHolder.includes(filterList[i])}
                id={itemClients.clients[i]._id}
                label={itemClients.clients[i].name}
                value={itemClients.clients[i]._id}
                className='block'
            />

            clientList.push(client)
        }


        setFilterClients(clientList)
    }





    const handleSubmission = async () => {
        console.log('ok')
    };



    const setFilteredList = (e) => {
        if (e.target.checked) {
            setFilterList([...filterList, e.target.value]);
        } else {
            setFilterList(filterList.filter(_id => _id !== e.target.value));
        }

        console.log(filterList)
    }

    const resetFields = (e) => {

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
                    Selecciona los clientes
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>

                <InputGroup onChange={(e) => setFilteredList(e)} className="flex flex-col">
                    {filterClients}
                </InputGroup>
                {filterList}
            </ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSubmission()}>
                        Cerrar
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


export default FilterClientsModal