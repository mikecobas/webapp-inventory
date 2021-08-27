/* eslint-disable jsx-a11y/alt-text */
import React,{useState, useEffect, useContext} from 'react'
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
import LocationContext from '../../Context/Location/locationContext';

const LocationModal = (props) => {
    const { onHide, show } = props;
    const locationContext = useContext(LocationContext)
    const { location, addLocation } = locationContext;
    const [locationName, setLocationName] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        
        (async () => {

            setLoading(false)
       })()
    }, [])

    

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

        if (locationName.trim !== '') {
            const args = {
                name:locationName
            }
            await addLocation(args)
            close()
        }
          
    };


    const resetFields = () => {
        setLocationName('')
    }

    const close = () => {

        onHide()
        resetFields()
    }

    return (
        <Modal
     
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
            <ModalHeader closeButton>
                
                    <ModalTitle id="contained-modal-title-vcenter">
                  {location ? 'Editar ' +location.name : 'Agregar una Ubicación'}  
                    </ModalTitle>
            </ModalHeader>
            
               {!loading && <> <ModalBody>
                    <Form>
                    <div className="grid grid-rows-1 grid-flow-col">
                        <Form.Group className="mb-3" controlId="location_name">
                            <Form.Label>Nombre de la ubicación</Form.Label>
                            <Form.Control type="text" placeholder="Ubicación" value={ locationName} onChange={e => setLocationName(e.target.value) }/>
                        </Form.Group>            
                    </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button className='mx-2' variant="outlined"  onClick={close}>Close</Button>
                <Button variant="contained" color="primary" onClick={()=>handleSubmission()}>
                    {!location ? 'Guardar': 'Actualizar'}
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

export default LocationModal