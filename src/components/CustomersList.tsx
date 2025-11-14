import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Pagination, Select, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { getCustomers, getTemplates } from '../api/api'
import SendIcon from '@mui/icons-material/Send';

function CustomersList() {

    const [customers, setCustomers] = useState<any[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [templatesList, setTemplatesList] = useState<{ name: string, content: string }[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [pagination, setPagination] = useState<{
        totalPages: number,
        page: number,
        limit: number,
        total: number,
    }>({
        totalPages: 0,
        total: 0,
        page: 1,
        limit: 10,
    });

    useEffect(() => {
        getTemplates()
            .then(({templates}: {templates: { name: string, content: string }[]}) => {
                setTemplatesList(templates);
            });
        getCustomers(pagination)
            .then(({customers, meta}) => {
                setCustomers(customers);
                setPagination({ ...pagination, ...meta });
            });
    }, []);

    return (
        <Box mb={4}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
            <FormControl>
            <InputLabel id="template-select-label">Template</InputLabel>
                <Select
                    labelId="template-select-label"
                    label="Template"
                    value={selectedTemplate}
                    onChange={(event) => {
                        setSelectedTemplate(event.target.value);
                    }}
                    disabled={!templatesList.length}
                    sx={{
                        width: 200,
                    }}
                >
                    {templatesList.map((template: any) => (
                        <MenuItem key={template._id} value={template._id}>{template.name}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Button variant="contained" color="primary" startIcon={<SendIcon />} disabled={!selectedCustomers.length  || !selectedTemplate}>Enviar campaña</Button>
            </Box>
            <List>
                {customers.map((customer: any) => (
                    <ListItem key={customer._id} sx={{ padding: "2px 0" }}>
                        <Box 
                            sx={{ backdropFilter: 'blur(40px)', backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
                            p={2}
                            borderRadius={2}
                            width="100%"
                            boxShadow="0 0 10px 4px rgba(0, 0, 0, 0.1)"
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Box display="flex" gap={2} width="45%">
                                <Checkbox 
                                    checked={selectedCustomers.includes(customer._id)}
                                    onChange={() => {
                                        if (selectedCustomers.includes(customer._id)) {
                                            setSelectedCustomers(selectedCustomers.filter((id) => id !== customer._id));
                                        } else {
                                            setSelectedCustomers([...selectedCustomers, customer._id]);
                                        }
                                    }}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'secondary.main',
                                        },
                                    }}
                                    />
                                <ListItemText primary={customer.name} secondary={customer.description} />
                            </Box>
                            <Box display="flex" alignItems="center">
                                <StarIcon color="warning" />
                                <Typography variant="body2" color="secondary">{customer.rating}</Typography>
                            </Box>
                            <Box display="flex" gap={2}>
                                <Button variant="contained" color="secondary" startIcon={<LocationOnIcon />} onClick={() => {
                                    window.open(`https://www.google.com/maps/search/?api=1&query=${customer.latitude},${customer.longitude}`, '_blank');
                                }}>Ver en maps</Button>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} bgcolor="background.paper" p={2} borderRadius={2} style={{ backdropFilter: 'blur(20px)'}} width="fit-content" mx="auto">
                <Pagination 
                    onChange={
                        (_, page) => {
                            getCustomers({ ...pagination, page })
                                .then(({customers, meta}) => {
                                    setCustomers(customers);
                                    setPagination({ ...pagination, ...meta });
                                });
                        } 
                    }
                    count={pagination.totalPages} 
                    variant="outlined" 
                    shape="rounded" 
                    page={pagination.page}
                />
            </Box>
        </Box>
    )
}

export default CustomersList