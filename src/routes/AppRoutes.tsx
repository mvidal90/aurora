import { BrowserRouter, Route, Routes } from 'react-router'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import LoginPage from '../pages/LoginPage.tsx'
import HomePage from '../pages/HomePage'
import CreateCustomers from '../pages/CreateCustomers'
import CreateTemplate from '../pages/CreateTemplate'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/login" index element={<PublicRoute component={LoginPage} />} />
                <Route path="/" element={<PrivateRoute />} >
                    <Route index element={<HomePage />} />
                    <Route path="/create-customers" element={<CreateCustomers />} />
                    <Route path="/create-template" element={<CreateTemplate />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes