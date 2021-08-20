


import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const UserForm = () => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                

            } catch (error) {
               

            }
        }
    })
    return (
        <>
        <h1>HOLA</h1>  

        {/* <TextInput label='Contraseña' secureTextEntry style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                error={formik.errors.password}
            /> */}
        </>
    )
}


function initialValues() {
    return {
        identifier: '',
        password: ''
    }
}
function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}