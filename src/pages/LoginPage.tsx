import { use } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';

import AuthContext from '../context/AuthContext'

function LoginPage() {
    
    const { login, loading } = use(AuthContext);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
            <Box width="300px" borderRadius={8} p={8} bgcolor="background.paper" style={{ backdropFilter: 'blur(20px)'}}>
                <Typography variant="h2" textAlign="center" color="text.primary" fontSize={48} fontWeight={700} my={3}>Aurora</Typography>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={values => login(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('El usuario es requerido'),
                        password: Yup.string().required('La contraseña es requerida'),
                    })}
                >
                    {({ handleSubmit, values, handleChange, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Usuario"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                                />

                                <TextField
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                />
                                <Button type="submit" variant="contained" color="primary" loading={loading}>Iniciar sesión</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default LoginPage