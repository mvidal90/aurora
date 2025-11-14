import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Grid, Typography } from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TrashIcon from '@mui/icons-material/Delete';

import { createCustomers as createCustomersApi } from '../api/api';

function CreateCustomers() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<Record<string, string | boolean>[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const parseCsv = (text: string) => {
        const rows = text.replace(/\r/g, '').split('\n').filter(Boolean);
        if (!rows.length) {
            return [];
        }
        const headers = rows[0].split(',').map((header) => header.trim());
        return rows.slice(1).map((row) => {
            const values = row.split(',').map((value) => value === "TRUE" ? true : value === "FALSE" ? false : value.trim());
            return headers.reduce<Record<string, string | boolean>>((acc, header, index) => {
                acc[header] = values[index] as string | boolean;
                return acc;
            }, {});
        });
    };
    
    const handleSubmit = (values: Record<string, string | boolean>[]) => {
        setLoading(true);
        createCustomersApi({ customers: values })
            .then(({customers}: {customers: any[]}) => {
                alert(`Cantidad de clientes agregados: ${customers.length}`);
                navigate('/');
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="secondary" startIcon={<DashboardIcon />} onClick={() => navigate('/')} fullWidth>Dashboard</Button>
            </Grid>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate('/create-template')} fullWidth>Crear template</Button>
            </Grid>
            <Grid size={12}>
                <Typography variant="h2" color="secondary.contrastText" fontSize={32} fontWeight={600}>Guardar posibles clientes</Typography>
            </Grid>
            <Grid size={12}>
                <Box display="flex" alignItems="center" gap={2}>
                    <input
                        type="file"
                        accept=".csv"
                        hidden
                        id="file-input"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    const text = event.target?.result as string;
                                    setCustomers(parseCsv(text) as Record<string, string | boolean>[]);
                                };
                                reader.readAsText(file);
                            }
                        }}
                    />
                    <Button variant="contained" color="secondary" startIcon={<UploadIcon />} onClick={() => document.getElementById('file-input')?.click()} >Cargar archivo</Button>
                    <Typography variant="body1" color="text.secondary">Cantidad de clientes: {customers.length}</Typography>
                </Box>
                <Box my={2}>
                    {
                        customers.length > 0 && (
                            <Box component="pre" sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, boxSizing: 'border-box'}} bgcolor="background.paper" height="100%">
                                <Typography component="code" variant="body1" color="text.secondary">{JSON.stringify(customers, null, 4)}</Typography>
                                <Box my={2}>
                                    {
                                        errors.length > 0 && (
                                            errors.map((error) => (
                                                    <Typography component="span" variant="body1" color="error" display="block">{error}</Typography>
                                                ))
                                            )
                                    }
                                </Box>
                            </Box>
                        )
                    }
                </Box>
            </Grid>
            <Grid size={12}>
                <Box mb={4} display="flex" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveAsIcon />}
                        loading={loading}
                        disabled={customers.length === 0 || loading}
                        onClick={() => handleSubmit(customers)}
                    >
                        Guardar Clientes
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<TrashIcon />}
                        onClick={() => {
                            setCustomers([]);
                            setErrors([]);
                        }}
                    >
                        Limpiar
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CreateCustomers