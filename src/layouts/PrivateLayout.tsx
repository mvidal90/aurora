import { AppBar, Box, Button, CircularProgress, Container, Toolbar, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext'
import { use } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

function PrivateLayout({ children, loading }: { children: React.ReactNode, loading: boolean }) {
    const { logout } = use(AuthContext);
    return (
        <Box>
            <AppBar position="fixed">
                <Container>
                    <Toolbar>
                            <Typography variant="h4">Aurora</Typography>
                            <Box flexGrow={1} />
                            <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{mt: 10}}>
                {loading ? (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CircularProgress />
                    </Box>
                ) : children}
            </Container>
        </Box>
    )
}

export default PrivateLayout