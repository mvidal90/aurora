import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadIcon from '@mui/icons-material/Upload';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import { createTemplate as createTemplateApi } from '../api/api';

function CreateTemplate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = (values: { name: string, content: string }) => {
        setLoading(true);
        createTemplateApi(values)
            .then(({template, msj}) => {
                alert(`${template.name}: ${msj}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="secondary" startIcon={<DashboardIcon />} onClick={() => navigate('/')} fullWidth>Dashboard</Button>
            </Grid>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="primary" startIcon={<UploadIcon />} onClick={() => navigate('/create-customers')} fullWidth>Ir a cargar archivo</Button>
            </Grid>
            <Grid size={12}>
                <Typography variant="h2" color="secondary.contrastText" fontSize={32} fontWeight={600}>Crear template</Typography>
            </Grid>
            <Grid size={12}>
                <Formik
                    initialValues={{ name: '', content: '' }}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('El nombre es requerido'),
                        content: Yup.string().required('El contenido HTML es requerido'),
                    })}
                >
                    {({ handleSubmit, values, handleChange, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, md: 7}}>
                                    <TextField
                                        label="Nombre"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <TextField
                                        label="Contenido HTML"
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        error={Boolean(errors.content)}
                                        helperText={errors.content}
                                        fullWidth
                                        multiline
                                        rows={10}
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Box dangerouslySetInnerHTML={{ __html: values.content }} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, boxSizing: 'border-box'}} height="100%" />
                                </Grid>
                                <Button type="submit" variant="contained" color="primary" startIcon={<SaveAsIcon />} loading={loading}>Guardar template</Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    )
}

export default CreateTemplate