import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'

import AuthProvider from './context/AuthProvider'

import AppRoutes from './routes/AppRoutes'

function App() {

  return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
  )
}

export default App
