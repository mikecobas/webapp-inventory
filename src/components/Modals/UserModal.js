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
import InputGroup from 'react-bootstrap/InputGroup'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { map } from 'lodash'
import Api from '../../utils/api'
import md5 from 'md5';

import UserContext from '../../Context/User/userContext';

const UserModal = (props) => {
    const { onHide, show } = props;
    const userContext = useContext(UserContext)
    const { usuario, addUser } = userContext;
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [roles, setRoles] = useState(null)
    const [selectedRole, setRoleSelected] = useState('')
    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState('')
    const [email, setEmail] = useState('')



    const [loading, setLoading] = useState(true)
    useEffect(() => {

        (async () => {
            if (usuario) {
                setName(usuario.name);
                setEmail(usuario.email);
                setRoleSelected(usuario.role);

            }
            console.log('test')
            await listClients();


            setLoading(false)
        })()
    }, [usuario])




    const listClients = async () => {
        const itemClients = await Api.getClients();

        const clientOption = map(itemClients.clients, (client, index) => {
            return <option key={index + 1} value={client._id}>{client.company_name}</option>
        })

        setClients(clientOption)
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



    const handleSubmission = async () => {
        if (password.trim() !== '' && repeatPassword.trim() !== '' && password === repeatPassword) {
            const args = {
                name: name,
                email: email,
                password: md5(password),
                role: selectedRole,
            }

            if (selectedRole === 'CLIENT') {
                args.client = clientSelected
            }

            console.log(args)
            await addUser(args)
           
                close()

        }


    };



    const resetFields = () => {
        setName('');
        setPassword('');
        setEmail('');
        setRepeatPassword('');
        setRoleSelected('');
        setClientSelected('')
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
                    {usuario ? 'Editar ' + usuario.name : 'Agregar Usuario'}
                </ModalTitle>
            </ModalHeader>

            {!loading && <> <ModalBody>

                <Form>
                    <div className="grid grid-rows-2 grid-flow-col gap-4">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="repeat-password">
                            <Form.Label>Repetir Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Repetir Contraseña" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        </Form.Group>




                    </div>
                    <Form.Group className="mb-3" controlId="role_id">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select data-live-search aria-label="Roles" onChange={(event) => setRoleSelected(event.target.value)} value={selectedRole}>
                            <option key='0' value=''> Selecciona un rol</option>
                            <option key='1' value='USER'>Empleado</option>
                            <option key='2' value='CLIENT'>Cliente</option>
                            <option key='3' value='ADMIN'> Administrador</option>
                            <option key='4' value='SUPER_ADMIN'> Super Admin</option>

                        </Form.Select>
                    </Form.Group>
                    {selectedRole === 'CLIENT' ?
                        <Form.Group className="mb-3" controlId="client_id">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select data-live-search aria-label="Cliente" onChange={(event) => setClientSelected(event.target.value)} value={clientSelected}>
                                <option key='0' value=''> Selecciona un cliente</option>
                                {clients}
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
                        {!usuario ? 'Guardar' : 'Actualizar'}
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

export default UserModal