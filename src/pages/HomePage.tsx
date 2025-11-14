import {Grid, Button } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

import CustomersList from '../components/CustomersList';

function HomePage() {

    const navigate = useNavigate();
    
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="primary" startIcon={<UploadIcon />} onClick={() => navigate('/create-customers')} fullWidth>Ir a cargar archivo</Button>
            </Grid>
            <Grid size={{xs: 6, md: 3, lg: 2}}>
                <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => navigate('/create-template')} fullWidth>Crear template</Button>
            </Grid>
            <Grid size={12}>
                <CustomersList />
            </Grid>
        </Grid>
    )
}

export default HomePage